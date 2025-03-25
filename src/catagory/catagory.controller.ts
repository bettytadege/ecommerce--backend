/* eslint-disable prettier/prettier */
import { CreateCatagoryDto } from './dto/create.catagory.dto';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CatagoryService } from './catagory.service';
import { UpdateCatagoryDto } from './dto/update.catagory.dto';

@Controller('catagories')
export class CatagoryController {
    constructor( private readonly catagoryService:CatagoryService){}
    @Post('create')
    async create(@Body() createCatagoryDto:CreateCatagoryDto){
     return this.catagoryService.create(createCatagoryDto)
    }
    @Get('/')
    async findAll(){
        return this.catagoryService.findAll()
    }
    @Get(':id')
    async findById(@Param('id') id:string){
        return this.catagoryService.findById(id)
    }
    @Put(':id')
    async Update(@Param('id') id:string ,@Body() updateCatagoryDto:UpdateCatagoryDto){
        return this.catagoryService.update(id,updateCatagoryDto)
    }
    @Delete(':id')
    async delete(@Param('id') id:string){
        return this.catagoryService.delete(id)

    }
}
