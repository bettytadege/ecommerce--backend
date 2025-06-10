/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PrismaService } from 'src/prisma/Prisma.service';
import { ChapaModule } from 'chapa-nestjs';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ChapaModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secretKey = configService.get<string>('CHAPA_SECRET_KEY');
        if (!secretKey) {
          throw new Error(
            'CHAPA_SECRET_KEY is not defined in environment variables',
          );
        }
        return { secretKey };
      },
    }),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, PrismaService],
})

export class PaymentModule {}
