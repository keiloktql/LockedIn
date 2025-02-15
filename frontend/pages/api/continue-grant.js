import { eq } from "drizzle-orm";
import { getDb } from '../../lib/db';
import { goals, users } from '../../lib/schema';
import {
  createAuthenticatedClient,
  OpenPaymentsClientError,
  isFinalizedGrant,
} from "@interledger/open-payments";

export default async function handler(req, res) {
  const { goalId } = req.query;

  if (!goalId) {
    return res.status(400).json({ error: 'goalId is required' });
  }

  const db = getDb();

  try {
    let goal = await db.select().from(goals)
      .where(eq(goals.id, goalId))
      .limit(1);

    goal = goal[0];

    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    const { accessToken, continueUrl, quoteId } = goal;

    // Fetch user wallet information
    let user = await db.select().from(users)
      .where(eq(users.id, goal.userId))
      .limit(1);

    user = user[0];
    if (!user || !user.walletAddress || !user.walletPrivateKey || !user.walletKeyId) {
      return res.status(400).json({ error: 'User wallet information is incomplete' });
    }

    // Create authenticated client
    const client = await createAuthenticatedClient({
      walletAddressUrl: user.walletAddress,
      privateKey: user.walletPrivateKey,
      keyId: user.walletKeyId,
    });

    let finalizedOutgoingPaymentGrant;

    const grantContinuationErrorMessage =
      "\nThere was an error continuing the grant. You probably have not accepted the grant at the url (or it has already been used up, in which case, rerun the script).";

    try {
      console.log(continueUrl, accessToken)
      finalizedOutgoingPaymentGrant = await client.grant.continue({
        url: continueUrl,
        accessToken: accessToken,
      });
    } catch (err) {
      if (err instanceof OpenPaymentsClientError) {
        console.log(grantContinuationErrorMessage);
      }

      throw err;
    }

    if (!isFinalizedGrant(finalizedOutgoingPaymentGrant)) {
      console.log(
        "There was an error continuing the grant. You probably have not accepted the grant at the url."
      );
      process.exit();
    }

    const sendingWalletAddress = await client.walletAddress.get({
      url: user.walletAddress, // Make sure the wallet address starts with https:// (not $)
    });

    console.log(
      "\nStep 6: got finalized outgoing payment grant",
      finalizedOutgoingPaymentGrant
    );

    // Step 7: Finally, create the outgoing payment on the sending wallet address.
    // This will make a payment from the outgoing payment to the incoming one (over ILP)
    const outgoingPayment = await client.outgoingPayment.create(
      {
        url: sendingWalletAddress.resourceServer,
        accessToken: finalizedOutgoingPaymentGrant.access_token.value,
      },
      {
        walletAddress: sendingWalletAddress.id,
        quoteId: quoteId,
      }
    );

    console.log(
      "\nStep 7: Created outgoing payment. Funds will now move from the outgoing payment to the incoming payment.",
      outgoingPayment
    );
    return res.status(200).json({ accessToken, continueUrl });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
