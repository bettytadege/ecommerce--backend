/* eslint-disable prettier/prettier */
import {  ProductStatus } from "@prisma/client";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, IsUUID, Min, ValidateNested } from "class-validator";
import { CreateProductVariant } from "src/product-variant/dto/create.product.variant.dto";


export class CreateProductDto {
  @IsString()
  name: string;

  @IsString({ each: true })
  @IsArray()
  image: string[];

  @IsString()
  description: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  stock: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  sku: string;

  @IsNumber()
  @IsOptional()
  discount: number;

  @IsUUID()
  sellerId: string;

; 

  @IsUUID()
  categoryId: string;  

  @IsEnum(ProductStatus)
  status: ProductStatus;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductVariant)
  ProductVariant: CreateProductVariant[];
}