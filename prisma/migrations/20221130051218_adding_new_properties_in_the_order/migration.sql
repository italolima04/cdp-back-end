/*
  Warnings:

  - You are about to drop the column `approved` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `isActive` to the `subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `subscription` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "subscriptionStatus " AS ENUM ('Aprovada', 'Cancelada');

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_couponId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_subscriptionId_fkey";

-- AlterTable
ALTER TABLE "subscription" DROP COLUMN "approved",
ADD COLUMN     "isActive" BOOLEAN NOT NULL,
ADD COLUMN     "status" "subscriptionStatus " NOT NULL;

-- DropTable
DROP TABLE "Order";

-- CreateTable
CREATE TABLE "order" (
    "id" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    "couponId" TEXT,
    "receiverEmail" TEXT,
    "receiverCPF" TEXT,
    "receiverPhone" TEXT,
    "receiverFullName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "order_subscriptionId_key" ON "order"("subscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "order_couponId_key" ON "order"("couponId");

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "coupon"("id") ON DELETE SET NULL ON UPDATE CASCADE;
