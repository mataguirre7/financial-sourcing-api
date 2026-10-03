/*
  Warnings:

  - You are about to alter the column `hourlyRate` on the `Engagement` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(12,2)`.
  - You are about to alter the column `commissionRate` on the `Engagement` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,4)`.

*/
-- AlterTable
ALTER TABLE "Engagement" ALTER COLUMN "hourlyRate" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "commissionRate" SET DATA TYPE DECIMAL(5,4),
ALTER COLUMN "endDate" DROP NOT NULL;
