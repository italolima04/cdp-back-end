-- CreateEnum
CREATE TYPE "FormOfPayment" AS ENUM ('Cartão de crédito', 'Boleto');

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "formOfPayment" "FormOfPayment";
