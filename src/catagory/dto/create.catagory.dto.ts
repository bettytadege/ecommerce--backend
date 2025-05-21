/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IsString, IsNotEmpty, IsUUID  } from 'class-validator';



// DTO for Category
export class CreateCategoryDto {
  @ApiProperty({
    description: 'The name of the category',
    example: 'Electronics',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;


    @ApiProperty({
    description: 'The ID of the parent category (optional)',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  parentId?:string

}


