/*
  Warnings:

  - The `status` column on the `production_batches` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `updatedAt` to the `production_batches` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BatchStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "production_batches" ADD COLUMN     "laborCost" DECIMAL(12,2) NOT NULL DEFAULT 0,
ADD COLUMN     "otherCosts" DECIMAL(12,2) NOT NULL DEFAULT 0,
ADD COLUMN     "rawMaterialsCost" DECIMAL(12,2) NOT NULL DEFAULT 0,
ADD COLUMN     "totalBatchCost" DECIMAL(12,2) NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "BatchStatus" NOT NULL DEFAULT 'COMPLETED';

-- AlterTable
ALTER TABLE "production_consumptions" ADD COLUMN     "totalCost" DECIMAL(12,2) NOT NULL DEFAULT 0,
ADD COLUMN     "unitCost" DECIMAL(12,2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "production_outputs" ADD COLUMN     "costPerUnit" DECIMAL(12,2) NOT NULL DEFAULT 0;
