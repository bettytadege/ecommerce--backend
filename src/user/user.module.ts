/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/Prisma.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports:[PrismaModule]
})
export class UserModule {}
