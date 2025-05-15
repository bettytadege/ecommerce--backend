-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "txRef" TEXT;
