/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ChapaService, InitializeResponse } from 'chapa-nestjs';

import { PrismaService } from 'src/prisma/Prisma.service';
import { PaymentDataDto } from './dto/payment.data.dto';

@Injectable()
export class PaymentService {
  constructor(
    private readonly chapaService: ChapaService,
    private readonly prisma: PrismaService,
  ) {}

  async initializePayment(
    userId: string,
    orderId: string,
    paymentData: PaymentDataDto,
  ): Promise<InitializeResponse & { paymentId: string }> {
    try {
      // Verify user and order
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      const order = await this.prisma.order.findUnique({ where: { id: orderId } });
      if (!user || !order) {
        throw new NotFoundException('User or Order not found');
      }

      // Generate transaction reference
      const tx_ref = await this.chapaService.generateTransactionReference({
        prefix: 'tx',
        size: 15,
      });

      // Create payment record
      const payment = await this.prisma.payment.create({
        data: {
          userId,
          orderId,
          txRef: tx_ref,
          status: 'PENDING',
        },
      });

      // Initialize Chapa payment, 
      const response = await this.chapaService.initialize({
        ...paymentData,
        amount: paymentData.amount.toString(),
        tx_ref,
       return_url: process.env.CHAPA_RETURN_URL,
callback_url: process.env.CHAPA_CALLBACK_URL,

      });

      return { ...response, paymentId: payment.id };
    } catch (error:any) {
          console.error('🔥 Chapa Error :', error);
      throw new InternalServerErrorException(
        `Payment initialization failed: ${error.message}`,
      );
    }
  }

  async verifyPayment(tx_ref: string): Promise<any> {
    try {
      const verification = await this.chapaService.verify({ tx_ref });
      const payment = await this.prisma.payment.findFirst({
        where: { txRef: tx_ref },
        include: { order: true },
      });

      if (!payment) {
        throw new NotFoundException('Payment not found');
      }

      const newStatus = verification.status === 'success' ? 'SUCCESS' : 'FAILED';

      // Update payment status
      await this.prisma.payment.update({
        where: { id: payment.id },
        data: { status: newStatus, updatedAt: new Date() },
      });

      // Update order status
      if (verification.status === 'success') {
        await this.prisma.order.update({
          where: { id: payment.orderId },
          data: { status: 'CONFIRMED' },
        });
      } else {
        await this.prisma.order.update({
          where: { id: payment.orderId },
          data: { status: 'FAILED' },
        });
      }

      return verification;
    } catch (error:any) {
        console.log('',error)
      throw new InternalServerErrorException(
        `Payment verification failed: ${error.message}`,
      );
    }
  }
}
