/*
  Warnings:

  - You are about to alter the column `commissionAmount` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `Decimal(12,2)` to `Decimal(5,4)`.

*/
-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "commissionAmount" SET DATA TYPE DECIMAL(5,4);
