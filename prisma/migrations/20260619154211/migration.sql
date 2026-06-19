/*
  Warnings:

  - The values [NIL] on the enum `School` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Feedback` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `Bin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Bin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Bin` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SubmissionType" AS ENUM ('Feedback', 'Reports');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Received', 'Pending', 'Resolved');

-- CreateEnum
CREATE TYPE "BinType" AS ENUM ('General', 'Paper', 'Plastic', 'Metal', 'Glass', 'Ewaste');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('BinEarned', 'QuestEarned', 'Penalty', 'Redeemed');

-- AlterEnum
BEGIN;
CREATE TYPE "School_new" AS ENUM ('ENG', 'BUS', 'ASC', 'DES', 'HSS', 'IIT');
ALTER TABLE "user" ALTER COLUMN "school" TYPE "School_new" USING ("school"::text::"School_new");
ALTER TYPE "School" RENAME TO "School_old";
ALTER TYPE "School_new" RENAME TO "School";
DROP TYPE "public"."School_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_userId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_memberId_fkey";

-- AlterTable
ALTER TABLE "Bin" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "Feedback";

-- DropTable
DROP TABLE "Member";

-- DropTable
DROP TABLE "Report";

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "image" TEXT,
    "type" "SubmissionType" NOT NULL,
    "status" "Status" NOT NULL,
    "category" "Category" NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quest" (
    "id" TEXT NOT NULL,
    "awardedPoints" INTEGER NOT NULL,
    "questName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "Quest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestLog" (
    "id" TEXT NOT NULL,
    "questId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BinUsage" (
    "id" TEXT NOT NULL,
    "binId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "type" "BinType" NOT NULL,

    CONSTRAINT "BinUsage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "binUsageId" TEXT,
    "questLogId" TEXT,
    "pointsChanged" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transactionType" "TransactionType" NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Submission_userId_idx" ON "Submission"("userId");

-- CreateIndex
CREATE INDEX "QuestLog_questId_idx" ON "QuestLog"("questId");

-- CreateIndex
CREATE INDEX "QuestLog_userId_idx" ON "QuestLog"("userId");

-- CreateIndex
CREATE INDEX "BinUsage_binId_idx" ON "BinUsage"("binId");

-- CreateIndex
CREATE INDEX "BinUsage_userId_idx" ON "BinUsage"("userId");

-- CreateIndex
CREATE INDEX "Transaction_userId_idx" ON "Transaction"("userId");

-- CreateIndex
CREATE INDEX "Transaction_binUsageId_idx" ON "Transaction"("binUsageId");

-- CreateIndex
CREATE INDEX "Transaction_questLogId_idx" ON "Transaction"("questLogId");

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestLog" ADD CONSTRAINT "QuestLog_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestLog" ADD CONSTRAINT "QuestLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BinUsage" ADD CONSTRAINT "BinUsage_binId_fkey" FOREIGN KEY ("binId") REFERENCES "Bin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BinUsage" ADD CONSTRAINT "BinUsage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_binUsageId_fkey" FOREIGN KEY ("binUsageId") REFERENCES "BinUsage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_questLogId_fkey" FOREIGN KEY ("questLogId") REFERENCES "QuestLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
