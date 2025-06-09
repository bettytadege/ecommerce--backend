/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create.order.dto';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService:OrderService){}

    @Post('')
    async create(@Body() createOrderDto:CreateOrderDto){
        return this.orderService.create(createOrderDto)

    }
    @Get('')
    async findAll(@Query('userId') userId:string){
        return this.orderService.findAll(userId)
    }
}

