import { eq } from "drizzle-orm";
import { getDb } from '../../lib/db';
import { users } from '../../lib/schema'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, walletKeyId, walletPrivateKey, walletAddress } = req.body;

  if (!userId || !walletKeyId || !walletPrivateKey || !walletAddress === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const db = getDb();
    const user = await db.select().from(users).where('id', userId).limit(1);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await db.update(users)
      .set({
        walletKeyId,
        walletPrivateKey,
        walletAddress,
      })
      .where(eq(users.id, userId));

    return res.status(200).json({ message: 'Wallet information updated successfully' });
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' });
  }
}

