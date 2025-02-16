import { eq } from "drizzle-orm";
import { getDb } from '../../lib/db';
import { goals, users } from '../../lib/schema';
import { createAuthenticatedClient } from "@interledger/open-payments";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, stackAmount, description, startDate, endDate, beneficiary } = req.body;

  const db = getDb();

  // Fetch user wallet information
  let user = await db.select().from(users)
    .where(eq(users.id, userId))
    .limit(1);

  user = user[0];
  if (!user || !user.walletAddress || !user.walletPrivateKey || !user.walletKeyId) {
    console.log(user)
    return res.status(400).json({ error: 'User wallet information is incomplete' });
  }

  // Create authenticated client
  const client = await createAuthenticatedClient({
    walletAddressUrl: user.walletAddress,
    privateKey: user.walletPrivateKey,
    keyId: user.walletKeyId,
  });

  // Set up incoming payment to app wallet
  const sendingWalletAddress = await client.walletAddress.get({
    url: user.walletAddress, // Make sure the wallet address starts with https:// (not $)
  });
  const receivingWalletAddress = await client.walletAddress.get({
    url: process.env.APP_WALLET_ADDRESS_URL, // Ensure this environment variable is set
  });


  // Step 1: Get a grant for the incoming payment, so we can create the incoming payment on the receiving wallet address
  const incomingPaymentGrant = await client.grant.request(
    {
      url: receivingWalletAddress.authServer,
    },
    {
      access_token: {
        access: [
          {
            type: "incoming-payment",
            actions: ["read", "complete", "create"],
          },
        ],
      },
    }
  );

  const incomingPayment = await client.incomingPayment.create(
    {
      url: receivingWalletAddress.resourceServer,
      accessToken: incomingPaymentGrant.access_token.value,
    },
    {
      walletAddress: receivingWalletAddress.id,
      incomingAmount: {
        assetCode: receivingWalletAddress.assetCode,
        assetScale: receivingWalletAddress.assetScale,
        value: (stackAmount * 100).toString(),
      },
    }
  );

  // Step 3: Get a quote grant, so we can create a quote on the sending wallet address
  const quoteGrant = await client.grant.request(
    {
      url: sendingWalletAddress.authServer,
    },
    {
      access_token: {
        access: [
          {
            type: "quote",
            actions: ["create", "read"],
          },
        ],
      },
    }
  );

  console.log(
    "\nStep 3: got quote grant on sending wallet address",
    quoteGrant
  );

  // Step 4: Create a quote, this gives an indication of how much it will cost to pay into the incoming payment
  const quote = await client.quote.create(
    {
      url: sendingWalletAddress.resourceServer,
      accessToken: quoteGrant.access_token.value,
    },
    {
      walletAddress: sendingWalletAddress.id,
      receiver: incomingPayment.id,
      method: "ilp",
    }
  );

  console.log("\nStep 4: got quote on sending wallet address", quote);

  // Step 5: Start the grant process for the outgoing payments.
  // This is an interactive grant: the user (in this case, you) will need to accept the grant by navigating to the outputted link.
  const nonce = crypto.randomUUID()
  const outgoingPaymentGrant = await client.grant.request(
    {
      url: sendingWalletAddress.authServer,
    },
    {
      access_token: {
        access: [
          {
            type: "outgoing-payment",
            actions: ["read", "create"],
            limits: {
              debitAmount: {
                assetCode: quote.debitAmount.assetCode,
                assetScale: quote.debitAmount.assetScale,
                value: quote.debitAmount.value,
              },
            },
            identifier: sendingWalletAddress.id,
          },
        ],
      },
      interact: {
        start: ["redirect"],
        //finish: {
        //  method: "redirect",
        //  // This is where you can (optionally) redirect a user to after going through interaction.
        //  // Keep in mind, you will need to parse the interact_ref in the resulting interaction URL,
        //  // and pass it into the grant continuation request.
        //  uri: `http://localhost:3000`,
        //  nonce
        //},
      },
    }
  );

  console.log(
    "\nStep 5: got pending outgoing payment grant",
    outgoingPaymentGrant, nonce
  );

  if (!userId || !stackAmount || !description || !startDate || !endDate || !beneficiary) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const goal = await db.insert(goals).values({
      userId,
      stackAmount,
      description,
      startDate,
      endDate,
      paymentStatus: 'Pending Confirmation',
      beneficiary,
      accessToken: outgoingPaymentGrant.continue.access_token.value,
      continueUrl: outgoingPaymentGrant.continue.uri,
      quoteId: quote.id
    }).returning();

    return res.status(201).json({ message: 'Goal created successfully', goalId: goal[0].id, redirect_url: outgoingPaymentGrant.interact.redirect });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

