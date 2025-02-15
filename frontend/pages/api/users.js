// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getDb } from '../../lib/db';
import { users } from './schema'


export default async function handler(req, res) {
  const db = getDb();

  if (req.method === 'GET') {
    try {
      const allUsers = await db.select().from(users);
      res.status(200).json(allUsers);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
