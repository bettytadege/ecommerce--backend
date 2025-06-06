import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { PrismaModule } from 'src/prisma/Prisma.module';

@Module({
  providers: [AddressService],
  controllers: [AddressController],
  imports: [PrismaModule],
})
export class AddressModule {}
