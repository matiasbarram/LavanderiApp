/*
  Warnings:

  - Added the required column `paymentTicket` to the `OrderPayment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderPayment" ADD COLUMN     "paymentTicket" TEXT NOT NULL;
