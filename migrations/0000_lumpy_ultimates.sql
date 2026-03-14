CREATE TYPE "public"."interest_period" AS ENUM('DAILY', 'WEEKLY', 'MONTHLY');--> statement-breakpoint
CREATE TYPE "public"."loan_status" AS ENUM('ACTIVE', 'PAID');--> statement-breakpoint
CREATE TABLE "ai_sessions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "ai_sessions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"vapi_call_id" text,
	"summary" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "expenses" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "expenses_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"category" text NOT NULL,
	"description" text,
	"date" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "loans" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "loans_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"lender_id" integer NOT NULL,
	"borrower_id" integer NOT NULL,
	"principal_amount" numeric(12, 2) NOT NULL,
	"total_owed" numeric(12, 2) NOT NULL,
	"interest_rate" numeric(5, 2) NOT NULL,
	"interest_period" "interest_period" NOT NULL,
	"next_interest_accrual_date" timestamp NOT NULL,
	"status" "loan_status" DEFAULT 'ACTIVE' NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "repayments" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "repayments_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"loan_id" integer NOT NULL,
	"amount_paid" numeric(12, 2) NOT NULL,
	"paid_through" text,
	"notes" text,
	"payment_date" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"clerk_d" text NOT NULL,
	"email" text NOT NULL,
	"name" text,
	"image_url" text,
	"phone_number" varchar(20),
	"address" text,
	"main_budget" numeric(12, 2) DEFAULT '0.00',
	"ai_session_count" integer DEFAULT 0 NOT NULL,
	"ai_session_limit" integer DEFAULT 3 NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_clerk_d_unique" UNIQUE("clerk_d"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "ai_sessions" ADD CONSTRAINT "ai_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "loans" ADD CONSTRAINT "loans_lender_id_users_id_fk" FOREIGN KEY ("lender_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "loans" ADD CONSTRAINT "loans_borrower_id_users_id_fk" FOREIGN KEY ("borrower_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "repayments" ADD CONSTRAINT "repayments_loan_id_loans_id_fk" FOREIGN KEY ("loan_id") REFERENCES "public"."loans"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_expense_idx" ON "expenses" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "lender_idx" ON "loans" USING btree ("lender_id");--> statement-breakpoint
CREATE INDEX "borrower_idx" ON "loans" USING btree ("borrower_id");--> statement-breakpoint
CREATE INDEX "status_idx" ON "loans" USING btree ("status");--> statement-breakpoint
CREATE INDEX "repayment_loan_idx" ON "repayments" USING btree ("loan_id");