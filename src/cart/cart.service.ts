/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/Prisma.service';
import { CreateCartDto } from './dto/create.cart.dto';
import { UpdateCartDto } from './dto/update.cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCartDto: CreateCartDto) {
    const { userId, variantId, quantity } = createCartDto;

    // Check if the cart item already exists
    const existingItem = await this.prismaService.cart.findUnique({
      where: { userId_variantId: { userId, variantId } },
    });
    //  const product=await this.prismaService.product.findUnique({where:{id:productId},select:{name:true,image:true}})
    if (existingItem) {
      throw new BadRequestException(
        'Item already exists in cart. Update quantity instead.',
      );
    }

    return this.prismaService.cart.create({
      data: {
        userId,
        variantId,
        quantity,
      },
      include: {
        productVariant: {
          include: {
            product: { select: { name: true, image: true, id: true } },
          },
        },
      },
    });
  }

  async findAll(userId: string) {
    return this.prismaService.cart.findMany({
      where: { userId },
      orderBy:{createdAt:'desc'},
      include: {
        productVariant: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                image: true,
                price: true,
                description: true,
                categoryId: true,
              },
            },
          
          },
          
        },
      },
    });
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    try {
      let cart = await this.prismaService.cart.findUnique({
        where: {
          id,
        },
      });
      console.log(cart);
      if (!cart) {
        throw new NotFoundException(`no cart found with this ${id}`);
      }
      cart = await this.prismaService.cart.update({
        where: { id },
        data: { quantity: updateCartDto.quantity },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'cart updated successfully',
        cart,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const cart = await this.prismaService.cart.findUnique({
        where: {
          id,
        },
      });
      console.log(cart);
      if (!cart) {
        throw new NotFoundException(`no cart found with this ${id}`);
      }
      await this.prismaService.cart.delete({
        where: { id },
      });

      return {
        message: 'cart deleted successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
