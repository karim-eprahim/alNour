-- CreateEnum
CREATE TYPE "DeliveryResult" AS ENUM ('NONE', 'FULL', 'PARTIAL', 'FAILED', 'CANCELLED');

-- Backfill legacy DELIVERED status -> COMPLETED before the enum value is removed
UPDATE "sales_orders" SET "status" = 'COMPLETED' WHERE "status" = 'DELIVERED';

-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('PENDING', 'ASSIGNED', 'ACCEPTED', 'OUT_FOR_DELIVERY', 'COMPLETED', 'CANCELLED');
ALTER TABLE "public"."sales_orders" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "sales_orders" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "public"."OrderStatus_old";
ALTER TABLE "sales_orders" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable: preserve legacy timestamps into the new field names
ALTER TABLE "sales_orders" RENAME COLUMN "startedDeliveryAt" TO "outForDeliveryAt";
ALTER TABLE "sales_orders" RENAME COLUMN "deliveredAt" TO "completedAt";
ALTER TABLE "sales_orders" ALTER COLUMN "completedAt" TYPE TIMESTAMP(3);
ALTER TABLE "sales_orders" ADD COLUMN "cancelReason" TEXT,
ADD COLUMN     "deliveryResult" "DeliveryResult" NOT NULL DEFAULT 'NONE',
ADD COLUMN     "partialDeliveryReason" TEXT;
