/* eslint-disable prettier/prettier */
import { PaginationDto } from 'src/dto/pagnation.dto';
import { CreateProductDto } from './dto/create.product.dto';
import { UpdateProductDto } from './dto/update.product.dto';
import { ProductService } from './product.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

@Controller('product')
export class ProductController {
    constructor(private readonly productService:ProductService){}

    @Post('')
    async create(@Body() createProductDto:CreateProductDto){
        console.log('create product')
        return this.productService.create(createProductDto)  
    }

    @Get('/')
    async findAll(){
    return this.productService.findAll()
    }

     @Get('new-arrival')
    async getNewArrival(@Query('limit') limit:string){
        const num=parseInt(limit) || 10
        return this.productService.getNewArrival(num)
    }

    @Get(':id')
    async findOne(@Param('id') id:string){
        return this.productService.findOne(id)
    }

    @Get('seller/:id')
    async findProductsBySeller(@Param('id') id:string){
        return this.productService.findProductsBySeller(id)
        
    }

   

    @Get('catagory/:id')
    async findProductsByCatagory(@Param('id') categoryId:string, @Query() paginationDto:PaginationDto){
        return this.productService.findProductsByCatagory(categoryId,paginationDto)
    }

    @Put(':id')
    async update(@Param('id') id:string, @Body() updateProductDto:UpdateProductDto){
        return this.productService.update(id,updateProductDto)
    }

    @Delete(':id')
    async remove(@Param('id') id:string){
        return this.productService.remove(id)
    }
    
    @Get(':subcategoryId/related')
getRelatedProducts(
  @Param('subcategoryId') subcategoryId: string,
  @Query('exclude') excludeProductId: string,
) {
  return this.productService.getRelatedProducts(subcategoryId, excludeProductId);
}

    
}
