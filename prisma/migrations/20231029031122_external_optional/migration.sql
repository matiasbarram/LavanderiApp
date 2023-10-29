-- AlterTable
ALTER TABLE "OrderDetail" ALTER COLUMN "external" SET DEFAULT false,
ALTER COLUMN "externalDetails" DROP NOT NULL;
