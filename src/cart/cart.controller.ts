/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create.cart.dto';
import { UpdateCartDto } from './dto/update.cart.dto';

@Controller('cart')
export class CartController {
        constructor(private readonly cartService:CartService){}
        @Post()
 
 async create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }
  @Get()
  findAll(@Query('userId') userId: string) {
    return this.cartService.findAll(userId);
  }
   @Delete(':id')
      async remove(@Param('id') id:string){
          return this.cartService.remove(id)
      }
      @Patch(':id')
      async update(@Param('id')id:string, @Body() updateCartDto:UpdateCartDto){
        return  this.cartService.update(id,updateCartDto)
      }
}
