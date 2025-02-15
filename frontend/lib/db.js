import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;

// Create a singleton for the database connection
let dbInstance;

export function getDb() {
  if (!dbInstance) {
    const client = postgres(connectionString, { prepare: false });
    dbInstance = drizzle(client);
  }
  return dbInstance;
}
