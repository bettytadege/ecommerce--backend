/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */


import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CatagoryService } from './catagory.service';
import { CreateCategoryDto } from './dto/create.catagory.dto';
import { UpdateCatagoryDto } from './dto/update.catagory.dto';



@Controller('categories')
export class CatagoryController {
    constructor( private readonly catagoryService:CatagoryService){}
    @Post('create')
    async create(@Body() createCatagoryDto: CreateCategoryDto){
     return this.catagoryService.create(createCatagoryDto)
    }
    @Get('/')
     findAll(){
        return this.catagoryService.findAll()
    }
    @Get('root')
    async getRootCategory() {
      return this.catagoryService.getRootCategory();
    }
    @Get('with-products')
    async getCategoriesWithProducts() {
      
      return this.catagoryService.getCategoriesWithProducts();
    }

    @Get(':id')
    async findOne(@Param('id') id:string){
        return this.catagoryService.findOne(id)

    }
   
    @Put(':id')
    async Update(@Param('id') id:string ,@Body() updateCatagoryDto:UpdateCatagoryDto){
        return this.catagoryService.update(id,updateCatagoryDto)
    }
    @Delete(':id')
    async remove(@Param('id') id:string){
        return this.catagoryService.remove(id)

    }
  
}
