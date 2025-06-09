/* eslint-disable prettier/prettier */

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  
} from '@nestjs/common';
import { CatagoryService } from './catagory.service';
import { CreateCategoryDto } from './dto/create.catagory.dto';
import { UpdateCatagoryDto } from './dto/update.catagory.dto';

import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('categories')
export class CatagoryController {
  constructor(private readonly catagoryService: CatagoryService) {}
  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ type: CreateCategoryDto })
  async create(@Body() createCatagoryDto: CreateCategoryDto) {
    return this.catagoryService.create(createCatagoryDto);
  }
  @Get('/')
  // @ApiQuery({
 
  @ApiOperation({ summary: 'get all categories' })
  findAll() {
    return this.catagoryService.findAll();
  }
  
  @Get('root')
  @ApiOperation({ summary: 'get root categories' })
  async getRootCategory() {
    return this.catagoryService.getRootCategory();
  }

  @Get('with-products')
  async getCategoriesWithProducts() {
    return this.catagoryService.getCategoriesWithProducts();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.catagoryService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'update category' })
  async Update(
    @Param('id') id: string,
    @Body() updateCatagoryDto: UpdateCatagoryDto,
  ) {
    return this.catagoryService.update(id, updateCatagoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'remove category' })
  async remove(@Param('id') id: string) {
    return this.catagoryService.remove(id);
  }
}
