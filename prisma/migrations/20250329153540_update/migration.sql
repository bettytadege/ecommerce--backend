/*
  Warnings:

  - You are about to drop the column `parentId` on the `MainCategory` table. All the data in the column will be lost.
  - Made the column `mainCategoryId` on table `SubCategory` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `attribute` to the `SubSubCategory` table without a default value. This is not possible if the table is not empty.
  - Made the column `subCategoryId` on table `SubSubCategory` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "MainCategory_parentId_idx";

-- AlterTable
ALTER TABLE "MainCategory" DROP COLUMN "parentId";

-- AlterTable
ALTER TABLE "SubCategory" ALTER COLUMN "mainCategoryId" SET NOT NULL;

-- AlterTable
ALTER TABLE "SubSubCategory" ADD COLUMN     "attribute" JSONB NOT NULL,
ALTER COLUMN "subCategoryId" SET NOT NULL;
