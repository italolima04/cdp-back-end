/*
  Warnings:

  - The `status` column on the `plan` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "plan" DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN DEFAULT true;

-- DropEnum
DROP TYPE "status_plan";
