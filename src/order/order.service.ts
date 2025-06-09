/* eslint-disable prettier/prettier */

import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/Prisma.service';
import { CreateOrderDto } from './dto/create.order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const {
      userId,
      productId,
      quantity,
      variantId,
      cartId,
      addressId,
     
    } = createOrderDto;
    try {
      const order = await this.prismaService.$transaction(async (prisma) => {
        // check if user exist
        const user = await prisma.user.findUnique({
          where: { id: userId },
        });
        console.log('user', user);
        if (!user) {
          throw new NotFoundException(`no user found with this id`);
        } 
        //check if order is exist with status pending
        const existingOrder = await prisma.order.findFirst({
          where: { cartId, userId, status: 'PENDING' },
        });
        if (existingOrder) {
          return existingOrder; // Reuse existing pending order
        }
       
        const variant = await prisma.productVariant.findFirst({
          where: { id: variantId, productId:productId },
        });
        const cart = await this.prismaService.cart.findFirst({
          where: {id:cartId,userId:userId },
        });
        if (!cart) {
          throw new NotFoundException(
            'Cart not found or does not belong to the user',
          );
        }
        console.log('variant', variant);
        if (!variant?.productId) {
          throw new NotFoundException(`no product found with this id`);
        }
        if (!variant) {
          throw new NotFoundException(`no product variant found with this id`);
        }
        if (variant.stock == null) {
          throw new BadRequestException('Productvariant stock is not defined');
        }
        if (variant.price == null) {
          throw new BadRequestException('Productvariant price is not defined');
        }
        if (variant.stock <= 0) {
          throw new BadRequestException('product is out stock');
        }
        if (variant.stock < quantity) {
          throw new BadRequestException('Insufficient stock');
        }
        // calculate total price
        // let finalAddressId: string;
        if (addressId) {
          // Check if the provided address exists and belongs to the user
          const address = await this.prismaService.address.findFirst({
            where: { id: addressId, userId:userId },
          });
          if (!address) {
            throw new NotFoundException(
              ' address not found or does not belong to the user',
            );
          }
          // Check for existing orders with the same cartIds
      
       
        }
        const total = variant.price * quantity;
        console.log('total', total);
        await prisma.productVariant.update({
          where: { id: variantId },
          data: { stock: { decrement: quantity } },
        });
        return await prisma.order.create({
          data: {
            userId,
            productId,
            quantity,
            variantId,
            cartId,
            addressId:addressId!,
            subTotal: total,
            status: 'PENDING'
          },
        });
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'order created successfully',
        data: order,
      };
    } catch (error: any) {
      console.log('error', error);
      throw error;
    }
  }

  async findAll(userId:string){
    const user = await this.prismaService.user.findUnique({
          where: { id: userId },
        });
        console.log('user', user);
        if (!user) {
          throw new NotFoundException(`no user found with this id`);
        }

        const order=await this.prismaService.order.findMany({
          where:{userId, status:'PENDING'},
          include:{product:{select:{image:true,price:true}},productVariant:true },
          
          
        })

        return order
        
  }
}
