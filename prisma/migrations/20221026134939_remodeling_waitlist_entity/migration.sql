/*
  Warnings:

  - You are about to drop the column `value` on the `WaitList` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `WaitList` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `city` to the `WaitList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `WaitList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `WaitList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `note` to the `WaitList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiveUpdates` to the `WaitList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `WaitList` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "WaitList_value_key";

-- AlterTable
ALTER TABLE "WaitList" DROP COLUMN "value",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "note" TEXT NOT NULL,
ADD COLUMN     "receiveUpdates" BOOLEAN NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WaitList_email_key" ON "WaitList"("email");
