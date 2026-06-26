/*
  Warnings:

  - You are about to drop the `worker_productivity` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[workerId,date]` on the table `attendance` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "worker_productivity" DROP CONSTRAINT "worker_productivity_productionBatchId_fkey";

-- DropForeignKey
ALTER TABLE "worker_productivity" DROP CONSTRAINT "worker_productivity_workerId_fkey";

-- AlterTable
ALTER TABLE "attendance" ALTER COLUMN "date" SET DATA TYPE DATE;

-- DropTable
DROP TABLE "worker_productivity";

-- CreateTable
CREATE TABLE "worker_daily_wages" (
    "id" TEXT NOT NULL,
    "workerId" TEXT NOT NULL,
    "productionBatchId" TEXT NOT NULL,
    "dailyWage" DECIMAL(12,2) NOT NULL,
    "notes" TEXT,
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "worker_daily_wages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "attendance_workerId_date_key" ON "attendance"("workerId", "date");

-- AddForeignKey
ALTER TABLE "worker_daily_wages" ADD CONSTRAINT "worker_daily_wages_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "workers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "worker_daily_wages" ADD CONSTRAINT "worker_daily_wages_productionBatchId_fkey" FOREIGN KEY ("productionBatchId") REFERENCES "production_batches"("id") ON DELETE CASCADE ON UPDATE CASCADE;
