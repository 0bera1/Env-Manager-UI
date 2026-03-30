-- AlterTable: add columns as nullable first for existing rows
ALTER TABLE "User" ADD COLUMN "phone" TEXT;
ALTER TABLE "User" ADD COLUMN "fullName" TEXT;

-- Backfill unique phone for any row missing it (dev / legacy data)
UPDATE "User" SET "phone" = 'legacy-' || "id" WHERE "phone" IS NULL;

ALTER TABLE "User" ALTER COLUMN "phone" SET NOT NULL;

CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
