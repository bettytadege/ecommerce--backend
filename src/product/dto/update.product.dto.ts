/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create.product.dto';
import { ProductStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { UpdateProductVariantDto } from 'src/product-variant/dto/update.product.variant.dto';
import { IsDecimal } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @IsString()
  sku?: string; // Optional to align with PartialType

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  image?: string[];

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDecimal()
  price?: number; 

  @IsOptional()
  @IsDecimal()
  stock?: number; 

  @IsOptional()
  @IsUUID()
  sellerId?: string;

  @IsOptional()
  @IsDecimal()
  discount?: number; 

  @IsOptional()
  @IsUUID()
  categoryId?: string; 

  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductVariantDto)
  variants?: UpdateProductVariantDto[];
}