/*
  Warnings:

  - Added the required column `addressId` to the `subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "plan" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "subscription" ADD COLUMN     "addressId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "neighbourhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "complement" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coupon" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "benefit" TEXT,
    "discount" DOUBLE PRECISION,
    "isPermanent" BOOLEAN NOT NULL,
    "initialDate" TIMESTAMP(3),
    "expiredDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coupon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlanToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PlanToProduct_AB_unique" ON "_PlanToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_PlanToProduct_B_index" ON "_PlanToProduct"("B");

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlanToProduct" ADD CONSTRAINT "_PlanToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlanToProduct" ADD CONSTRAINT "_PlanToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
