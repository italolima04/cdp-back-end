/*
  Warnings:

  - The `status` column on the `plan` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "status_plan" AS ENUM ('ativo', 'inativo', 'deletado');

-- AlterTable
ALTER TABLE "plan" DROP COLUMN "status",
ADD COLUMN     "status" "status_plan" DEFAULT 'ativo';
