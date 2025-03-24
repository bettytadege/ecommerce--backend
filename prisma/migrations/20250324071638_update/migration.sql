/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Catagory` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Catagory" DROP CONSTRAINT "Catagory_parentId_fkey";

-- AlterTable
ALTER TABLE "Catagory" ALTER COLUMN "parentId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Catagory_name_key" ON "Catagory"("name");

-- CreateIndex
CREATE INDEX "Catagory_parentId_idx" ON "Catagory"("parentId");

-- AddForeignKey
ALTER TABLE "Catagory" ADD CONSTRAINT "Catagory_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Catagory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
