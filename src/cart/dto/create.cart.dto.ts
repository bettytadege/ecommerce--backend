/* eslint-disable prettier/prettier */
import { IsInt, Min, IsUUID } from 'class-validator';

export class CreateCartDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  variantId: string;
 


  @IsInt()
  @Min(1)
  quantity: number;
}