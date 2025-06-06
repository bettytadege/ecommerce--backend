/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}
    @Get()
       async findAll(){
           return this.userService.findAll()
       }
    @Get(':id')
       async findOne(@Param('id') id:string){
           return this.userService.findOne(id)
       }
    
       @Patch(':id')
       async update(  @Param('id') id:string, @Body() updateUserDto:UpdateUserDto){
        return this.userService.update(id,updateUserDto)
       }
}
