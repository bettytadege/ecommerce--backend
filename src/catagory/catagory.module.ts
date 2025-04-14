import { Module } from '@nestjs/common';
import { CatagoryController } from './catagory.controller';
import { CatagoryService } from './catagory.service';
import { PrismaModule } from 'src/prisma/Prisma.module';

@Module({
  controllers: [CatagoryController],
  providers: [CatagoryService],
  imports: [PrismaModule],
  // exports: [],
})
export class CatagoryModule {}
