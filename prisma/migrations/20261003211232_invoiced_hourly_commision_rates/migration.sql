/*
  Warnings:

  - Added the required column `invoicedCommissionRate` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoicedHourlyRate` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "invoicedCommissionRate" DECIMAL(12,2) NOT NULL,
ADD COLUMN     "invoicedHourlyRate" DECIMAL(12,2) NOT NULL;
