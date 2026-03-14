ALTER TABLE "users" RENAME COLUMN "clerk_d" TO "clerk_id";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_clerk_d_unique";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_clerk_id_unique" UNIQUE("clerk_id");