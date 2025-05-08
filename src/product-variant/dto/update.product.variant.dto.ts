/* eslint-disable prettier/prettier */
import { IsNumber, IsObject, IsOptional, IsString, Min } from "class-validator";

export class UpdateProductVariantDto{
    @IsString()
  sku: string; 

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @IsOptional()
  @IsObject()
  attribute?: Record<string, string>;
}