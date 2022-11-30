/*
  Warnings:

  - You are about to drop the column `planStripeId` on the `plan` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "plan" DROP CONSTRAINT "plan_productId_fkey";

-- AlterTable
ALTER TABLE "plan" DROP COLUMN "planStripeId";
