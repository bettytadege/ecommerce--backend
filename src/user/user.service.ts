/* eslint-disable prettier/prettier */
import {  Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/Prisma.service';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async findAll(){
      return this.prismaService.user.findMany()
    }

    async findOne(id: string):Promise<User> {
        try {
          console.log('id---------', id);
          const user = await this.prismaService.user.findUnique({
            where: {
              id,
            },
            
          });
          console.log(user);
          if (!user) {
            throw new NotFoundException(`no user found with this`);
          }
          return user;
        } catch (error) {
          console.log(error);
          throw error;
        }
      }

      async update(id: string ,updateUserDto:UpdateUserDto) {
        try {
          console.log('id---------', id);
          
          let user = await this.prismaService.user.findUnique({
            where: {
              id
            }
            
          });
          console.log('user',user);
          if (!user) {
            throw new NotFoundException(`no user found with this id`);
          }
           user=await this.prismaService.user.update({
            where:{
              id
            },
            data:updateUserDto
           })
           return {
             message:"user updated successfuly",
            user,
           }
        } catch (error) {
          console.log('error💥💥',error);
          throw error;
        }
      }
}
