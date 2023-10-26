/*
  Warnings:

  - Added the required column `external` to the `OrderDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `externalDetails` to the `OrderDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderDetail" ADD COLUMN     "external" BOOLEAN NOT NULL,
ADD COLUMN     "externalDetails" TEXT NOT NULL;
