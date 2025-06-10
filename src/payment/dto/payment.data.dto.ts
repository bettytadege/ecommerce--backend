/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';

export class CustomizationDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class PaymentDataDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  currency: string;

  @IsNumber()
  @Min(1)
  amount: number;

  @IsOptional()
  customization?: CustomizationDto;
}

export class InitializePaymentDto {
  @IsString()
  userId: string;

  @IsString()
  orderId: string;

   @ValidateNested()
  @Type(() => PaymentDataDto)
  paymentData: PaymentDataDto;
}
