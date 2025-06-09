/* eslint-disable prettier/prettier */
import { IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  productId: string;

  @IsUUID()
  variantId: string;

  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsUUID()
  cartId: string;

  @IsUUID()
  @IsOptional()
  addressId?: string;
}
