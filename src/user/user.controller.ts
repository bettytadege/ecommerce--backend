/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}
    @Get(':id')
       async findOne(@Param('id') id:string){
           return this.userService.findOne(id)
       }
       @Post(':id')
       async update(  @Param(':id') id:string, @Body() updateUserDto:UpdateUserDto){
        return this.userService.update(id,updateUserDto)
       }
}
