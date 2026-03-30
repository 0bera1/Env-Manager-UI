/*
  Warnings:

  - You are about to drop the column `projectId` on the `Environment` table. All the data in the column will be lost.
  - You are about to drop the `Variable` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Environment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Environment" DROP CONSTRAINT "Environment_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Variable" DROP CONSTRAINT "Variable_environmentId_fkey";

-- AlterTable
ALTER TABLE "Environment" DROP COLUMN "projectId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Variable";

-- CreateTable
CREATE TABLE "EnvVariable" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "isSecret" BOOLEAN NOT NULL DEFAULT false,
    "environmentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EnvVariable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EnvVariable_key_environmentId_key" ON "EnvVariable"("key", "environmentId");

-- AddForeignKey
ALTER TABLE "Environment" ADD CONSTRAINT "Environment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnvVariable" ADD CONSTRAINT "EnvVariable_environmentId_fkey" FOREIGN KEY ("environmentId") REFERENCES "Environment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
