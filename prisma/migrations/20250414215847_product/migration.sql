/*
  Warnings:

  - You are about to drop the `_MainCategoryToProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `maincategoryId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_MainCategoryToProduct" DROP CONSTRAINT "_MainCategoryToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_MainCategoryToProduct" DROP CONSTRAINT "_MainCategoryToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "maincategoryId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_MainCategoryToProduct";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_maincategoryId_fkey" FOREIGN KEY ("maincategoryId") REFERENCES "MainCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
