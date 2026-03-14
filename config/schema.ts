import {
  pgTable,
  text,
  timestamp,
  numeric,
  integer,
  pgEnum,
  index,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// --- ENUMS ---
export const interestPeriodEnum = pgEnum("interest_period", [
  "DAILY",
  "WEEKLY",
  "MONTHLY",
]);
export const loanStatusEnum = pgEnum("loan_status", ["ACTIVE", "PAID"]);

/**
 * 1. USERS TABLE
 */
export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  clerkId: text("clerk_id").notNull().unique(), // Clerk ID
  email: text("email").notNull().unique(),
  name: text("name"),
  imageUrl: text("image_url"),
  phoneNumber: varchar("phone_number", { length: 20 }),
  address: text("address"),

  // Financial Overview
  mainBudget: numeric("main_budget", { precision: 12, scale: 2 }).default(
    "0.00",
  ),

  // AI Session Management
  aiSessionCount: integer("ai_session_count").default(0).notNull(),
  aiSessionLimit: integer("ai_session_limit").default(3).notNull(),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

/**
 * 2. LOANS TABLE
 * The "contract" between two users
 */
export const loans = pgTable(
  "loans",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    lenderId: integer("lender_id")
      .references(() => users.id)
      .notNull(),
    borrowerId: integer("borrower_id")
      .references(() => users.id)
      .notNull(),

    // Money values
    principalAmount: numeric("principal_amount", {
      precision: 12,
      scale: 2,
    }).notNull(),
    totalOwed: numeric("total_owed", { precision: 12, scale: 2 }).notNull(),

    // Interest Settings
    interestRate: numeric("interest_rate", {
      precision: 5,
      scale: 2,
    }).notNull(), // e.g. 5.00
    interestPeriod: interestPeriodEnum("interest_period").notNull(),

    // Timing
    nextInterestAccrualDate: timestamp("next_interest_accrual_date").notNull(),
    status: loanStatusEnum("status").default("ACTIVE").notNull(),

    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("lender_idx").on(table.lenderId),
    index("borrower_idx").on(table.borrowerId),
    index("status_idx").on(table.status),
  ],
);

/**
 * 3. REPAYMENTS TABLE
 * Every time someone pays back a portion of the loan
 */
export const repayments = pgTable(
  "repayments",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    loanId: integer("loan_id")
      .references(() => loans.id)
      .notNull(),
    amountPaid: numeric("amount_paid", { precision: 12, scale: 2 }).notNull(),

    // New properties requested
    paidThrough: text("paid_through"), // e.g., 'GCash', 'Cash', 'Maya'
    notes: text("notes"), // e.g., 'Paid for the first week'

    paymentDate: timestamp("payment_date").defaultNow().notNull(),
  },
  (table) => [index("repayment_loan_idx").on(table.loanId)],
);

/**
 * 4. EXPENSES TABLE
 * Personal budget tracking
 */
export const expenses = pgTable(
  "expenses",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer("user_id")
      .references(() => users.id)
      .notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    category: text("category").notNull(),
    description: text("description"),
    date: timestamp("date").defaultNow(),
  },
  (table) => [index("user_expense_idx").on(table.userId)],
);

/**
 * 5. AI CONSULTATIONS
 */
export const aiSessions = pgTable("ai_sessions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  vapiCallId: text("vapi_call_id"),
  summary: text("summary"),
  createdAt: timestamp("created_at").defaultNow(),
});

// --- RELATIONSHIPS ---
export const usersRelations = relations(users, ({ many }) => ({
  loansAsLender: many(loans, { relationName: "lender" }),
  loansAsBorrower: many(loans, { relationName: "borrower" }),
  expenses: many(expenses),
  aiSessions: many(aiSessions),
}));

export const loansRelations = relations(loans, ({ one, many }) => ({
  lender: one(users, {
    fields: [loans.lenderId],
    references: [users.id],
    relationName: "lender",
  }),
  borrower: one(users, {
    fields: [loans.borrowerId],
    references: [users.id],
    relationName: "borrower",
  }),
  repayments: many(repayments),
}));

export const repaymentsRelations = relations(repayments, ({ one }) => ({
  loan: one(loans, { fields: [repayments.loanId], references: [loans.id] }),
}));

// --- EXPORTED TYPES ---
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Loan = typeof loans.$inferSelect;
export type NewLoan = typeof loans.$inferInsert;

export type Repayment = typeof repayments.$inferSelect;
export type NewRepayment = typeof repayments.$inferInsert;

export type Expense = typeof expenses.$inferSelect;
export type NewExpense = typeof expenses.$inferInsert;

export type AiSession = typeof aiSessions.$inferSelect;
export type NewAiSession = typeof aiSessions.$inferInsert;
