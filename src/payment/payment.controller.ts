/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { InitializePaymentDto } from './dto/payment.data.dto';


@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('initialize')
  @UsePipes(new ValidationPipe({ transform: true }))
  async initializePayment(
    @Body() body: InitializePaymentDto,
  ): Promise<{ checkout_url: string; paymentId: string }> {
    const { userId, orderId, paymentData } = body;
    const response = await this.paymentService.initializePayment(userId, orderId, paymentData);
    return { checkout_url: response.data.checkout_url, paymentId: response.paymentId };
  }

  @Get('webhook')
  async handleWebhook(@Query('tx_ref') tx_ref: string): Promise<any> {
    const verification = await this.paymentService.verifyPayment(tx_ref);
    if (verification.status === 'success') {
      return { message: 'Payment verified and order updated', data: verification };
    }
    return { message: 'Payment verification failed', data: verification };
  }

  @Get('success')
  paymentSuccess(): any {
    return { message: 'Payment successful, awaiting verification' };
  }
}
