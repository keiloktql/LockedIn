import { pgTable, uuid, varchar, text, numeric, date, bigint, timestamp } from "drizzle-orm/pg-core"


export const users = pgTable("users", {
  id: uuid().primaryKey().notNull(),
  username: varchar({ length: 256 }),
  walletKeyId: text("wallet_key_id"),
  walletPrivateKey: text("wallet_private_key"),
  walletAddress: varchar("wallet_address", { length: 256 }),
  walletBalance: numeric("wallet_balance"),
  createdAt: date("created_at"),
});

export const goals = pgTable("goals", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "goals_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 1000000, cache: 1 }),
  createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
  stakeAmount: numeric("stake_amount"),
  description: text(),
  startDate: date("start_date"),
  endDate: date("end_date"),
  beneficiary: varchar(),
  userId: uuid("user_id"),
  paymentStatus: varchar("payment_status"),
  accessToken: text("access_token"),
  continueUrl: text("continue_url"),
  quoteId: text("quoteId"),
});
