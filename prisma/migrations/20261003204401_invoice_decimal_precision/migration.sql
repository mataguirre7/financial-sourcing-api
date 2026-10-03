/*
  Warnings:

  - You are about to alter the column `hoursWorked` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(8,2)`.
  - You are about to alter the column `grossAmount` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(12,2)`.
  - You are about to alter the column `commissionAmount` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(12,2)`.
  - You are about to alter the column `netAmount` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(12,2)`.

*/
-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "hoursWorked" SET DATA TYPE DECIMAL(8,2),
ALTER COLUMN "grossAmount" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "commissionAmount" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "netAmount" SET DATA TYPE DECIMAL(12,2);
