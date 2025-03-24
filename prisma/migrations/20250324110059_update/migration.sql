-- DropForeignKey
ALTER TABLE "Catagory" DROP CONSTRAINT "Catagory_parentId_fkey";

-- AddForeignKey
ALTER TABLE "Catagory" ADD CONSTRAINT "Catagory_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Catagory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
