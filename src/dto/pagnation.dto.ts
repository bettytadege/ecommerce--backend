/* eslint-disable prettier/prettier */
import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
;

export class PaginationDto {
  @ApiProperty({

    description: 'Number of items to return per page',
    type: Number,
    required: false,
    default: 10,   })
      @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @IsPositive()
  limit?: number;

  @ApiProperty({
    description: 'Number of items to skip (offset)',
    type: Number,
    required: false,
    default: 0,
  })
    @Type(() => Number)
  @IsNumber()
  @IsOptional()
  offset?: number;
}