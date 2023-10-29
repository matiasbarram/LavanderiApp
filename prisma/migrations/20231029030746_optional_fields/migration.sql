/*
  Warnings:

  - You are about to drop the column `orderId` on the `OrderDetail` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `OrderPayment` table. All the data in the column will be lost.
  - You are about to drop the column `orderPaymentId` on the `OrderPayment` table. All the data in the column will be lost.
  - You are about to drop the column `paymentDetails` on the `OrderPayment` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "OrderPayment_orderPaymentId_key";

-- AlterTable
ALTER TABLE "OrderDetail" DROP COLUMN "orderId",
ALTER COLUMN "checkout" DROP NOT NULL,
ALTER COLUMN "details" DROP NOT NULL;

-- AlterTable
ALTER TABLE "OrderPayment" DROP COLUMN "orderId",
DROP COLUMN "orderPaymentId",
DROP COLUMN "paymentDetails",
ALTER COLUMN "shippingCost" DROP NOT NULL,
ALTER COLUMN "paymentDate" DROP NOT NULL,
ALTER COLUMN "paymentMethod" DROP NOT NULL,
ALTER COLUMN "paymentType" DROP NOT NULL,
ALTER COLUMN "invoiceNumber" DROP NOT NULL;
