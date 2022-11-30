/*
  Warnings:

  - Made the column `receiverEmail` on table `order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `receiverCPF` on table `order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `receiverPhone` on table `order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `receiverFullName` on table `order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "order" ALTER COLUMN "receiverEmail" SET NOT NULL,
ALTER COLUMN "receiverCPF" SET NOT NULL,
ALTER COLUMN "receiverPhone" SET NOT NULL,
ALTER COLUMN "receiverFullName" SET NOT NULL;
