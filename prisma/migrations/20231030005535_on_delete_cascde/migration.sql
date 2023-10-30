-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_orderDataId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_orderPaymentId_fkey";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_orderDataId_fkey" FOREIGN KEY ("orderDataId") REFERENCES "OrderDetail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_orderPaymentId_fkey" FOREIGN KEY ("orderPaymentId") REFERENCES "OrderPayment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
