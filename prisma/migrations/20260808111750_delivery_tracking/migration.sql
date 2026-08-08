-- CreateEnum
CREATE TYPE "TrackingStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "delivery_tracking" (
    "id" TEXT NOT NULL,
    "salesOrderId" TEXT NOT NULL,
    "distributorId" TEXT NOT NULL,
    "status" "TrackingStatus" NOT NULL DEFAULT 'ACTIVE',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "lastUpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "delivery_tracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_locations" (
    "id" TEXT NOT NULL,
    "deliveryTrackingId" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "accuracy" DOUBLE PRECISION,
    "speed" DOUBLE PRECISION,
    "heading" DOUBLE PRECISION,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "delivery_locations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "delivery_tracking_salesOrderId_key" ON "delivery_tracking"("salesOrderId");

-- CreateIndex
CREATE INDEX "delivery_tracking_distributorId_status_idx" ON "delivery_tracking"("distributorId", "status");

-- CreateIndex
CREATE INDEX "delivery_tracking_status_lastUpdatedAt_idx" ON "delivery_tracking"("status", "lastUpdatedAt");

-- CreateIndex
CREATE INDEX "delivery_locations_deliveryTrackingId_recordedAt_idx" ON "delivery_locations"("deliveryTrackingId", "recordedAt");

-- AddForeignKey
ALTER TABLE "delivery_tracking" ADD CONSTRAINT "delivery_tracking_salesOrderId_fkey" FOREIGN KEY ("salesOrderId") REFERENCES "sales_orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_tracking" ADD CONSTRAINT "delivery_tracking_distributorId_fkey" FOREIGN KEY ("distributorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_locations" ADD CONSTRAINT "delivery_locations_deliveryTrackingId_fkey" FOREIGN KEY ("deliveryTrackingId") REFERENCES "delivery_tracking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
