-- CreateEnum
CREATE TYPE "DistributorOperationType" AS ENUM ('LOAD', 'SALE', 'RETURN', 'ADJUSTMENT', 'LOST', 'DAMAGED');

-- CreateEnum
CREATE TYPE "CashMovementType" AS ENUM ('PAYMENT_COLLECTED', 'CASH_HANDOVER', 'ADJUSTMENT');

-- CreateEnum
CREATE TYPE "OrderPriority" AS ENUM ('NORMAL', 'URGENT');

-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('PENDING', 'ASSIGNED', 'ACCEPTED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'COMPLETED', 'CANCELLED');
ALTER TABLE "public"."sales_orders" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "sales_orders" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "public"."OrderStatus_old";
ALTER TABLE "sales_orders" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "distributor_operations" DROP COLUMN "type",
ADD COLUMN     "type" "DistributorOperationType" NOT NULL;

-- AlterTable
ALTER TABLE "invoices" ADD COLUMN     "warehouseId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "sales_orders" ADD COLUMN     "acceptedAt" TIMESTAMP(3),
ADD COLUMN     "deliveredAt" TIMESTAMP(3),
ADD COLUMN     "deliveryNotes" TEXT,
ADD COLUMN     "expectedDeliveryDate" TIMESTAMP(3),
ADD COLUMN     "priority" "OrderPriority" NOT NULL DEFAULT 'NORMAL',
ADD COLUMN     "startedDeliveryAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "cashOnHand" DECIMAL(12,2) NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "distributor_cash_movements" (
    "id" TEXT NOT NULL,
    "distributorId" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "type" "CashMovementType" NOT NULL,
    "referenceId" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "distributor_cash_movements_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "distributor_cash_movements" ADD CONSTRAINT "distributor_cash_movements_distributorId_fkey" FOREIGN KEY ("distributorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "warehouses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
