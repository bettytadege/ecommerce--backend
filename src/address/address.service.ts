/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/Prisma.service';
import { CreateAddressDto } from './dto/create.address.dto';

@Injectable()
export class AddressService {
  constructor(private readonly prismaService: PrismaService) {}

  async createAddress( dto: CreateAddressDto) {
    const { street, city, state, postalCode,userId } = dto;
    const user=await this.prismaService.user.findUnique({where:{id:userId}})
    if(!user){
        throw  new UnauthorizedException('user is not found')
    }
    const newAddress = await this.prismaService.address.create({
      data: {
        userId,
        street,
        city,
        state,
        postalCode,
      },
    });
    return newAddress
}

  async getAddressByUserId(userId: string) {
   

  

    // Verify user exists
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      console.warn(`User with ID ${userId} not found`);
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Fetch the single address
    const address = await this.prismaService.address.findFirst({
      where: { userId },
      include:{user:true}
      
    });

    if (!address) {
      console.log(`No address found for user ID: ${userId}`);
    } else {
      console.log(`Found address for user ID: ${userId}`);
    }

    return address; 
  }
}
