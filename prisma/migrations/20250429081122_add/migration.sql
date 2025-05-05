/*
  Warnings:

  - You are about to drop the `_OrderToProductVariant` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `variantId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_OrderToProductVariant" DROP CONSTRAINT "_OrderToProductVariant_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToProductVariant" DROP CONSTRAINT "_OrderToProductVariant_B_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "variantId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_OrderToProductVariant";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
