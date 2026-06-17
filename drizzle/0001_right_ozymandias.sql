ALTER TABLE "account" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "userId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "updatedAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "created_by" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "updated_by" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "updatedAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "userId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "emailVerified" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "updatedAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "image" text;