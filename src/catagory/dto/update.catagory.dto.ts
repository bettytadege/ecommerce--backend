/* eslint-disable prettier/prettier */

import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create.catagory.dto';

// import { CreateCatagoryDto } from './create.catagory.dto';

export class UpdateCatagoryDto extends PartialType(CreateCategoryDto) {}
