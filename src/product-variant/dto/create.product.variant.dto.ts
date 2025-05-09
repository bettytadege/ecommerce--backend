/* eslint-disable prettier/prettier */



import { IsNumber, IsOptional, IsString, Min, IsArray, IsObject } from 'class-validator';

export class CreateProductVariant {
  @IsNumber()
  @Min(0)
  stock: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  price: number;

  @IsString()
  sku: string;

  @IsArray()
  @IsObject({ each: true })
  attribute: { name: string; value: string }[];  
}


