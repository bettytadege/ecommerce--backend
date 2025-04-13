/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CatagoryService } from './catagory.service';
import { CreateMainCategoryDto } from './dto/create.catagory.dto';
import { UpdateMainCatagoryDto } from './dto/update.catagory.dto';
// import { UpdateCatagoryDto } from './dto/update.catagory.dto';

@Controller('catagories')
export class CatagoryController {
    constructor( private readonly catagoryService:CatagoryService){}
    @Post('create')
    async create(@Body() createMainCatagoryDto: CreateMainCategoryDto){
     return this.catagoryService.create(createMainCatagoryDto)
    }
    @Get('/')
    async findAll(){
        return this.catagoryService.findAll()
    }
    @Get(':id')
    async findOne(@Param('id') id:string){
        return this.catagoryService.findOne(id)
    }
    @Put(':id')
    async Update(@Param('id') id:string ,@Body() updateMainCatagoryDto:UpdateMainCatagoryDto){
        return this.catagoryService.update(id,updateMainCatagoryDto)
    }
    @Delete(':id')
    async remove(@Param('id') id:string){
        return this.catagoryService.remove(id)

    }
}
