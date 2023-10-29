/*
  Warnings:

  - You are about to drop the column `orderDataId` on the `OrderDetail` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `OrderDetail` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "OrderDetail_orderDataId_key";

-- AlterTable
ALTER TABLE "OrderDetail" DROP COLUMN "orderDataId",
DROP COLUMN "updatedBy";
