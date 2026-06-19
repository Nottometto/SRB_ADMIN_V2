/*
  Warnings:

  - You are about to drop the column `totalPoints` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "totalPoints";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "totalPoints" INTEGER NOT NULL DEFAULT 0;
