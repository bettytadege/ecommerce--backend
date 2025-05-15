/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create.address.dto';

@Controller('address')
export class AddressController {
constructor(private readonly addressService:AddressService){}
@Get()
async getAddress(@Query('userId') userId: string) {
return  this.addressService.getAddressByUserId(userId);
}
@Post()
async create(@Body() dto: CreateAddressDto) {
//   const userId = req.user.id;
  return this.addressService.createAddress( dto);
}
}
