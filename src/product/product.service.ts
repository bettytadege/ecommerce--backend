/* eslint-disable prettier/prettier */

import { PrismaService } from 'src/prisma/Prisma.service';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create.product.dto';
import { UpdateProductDto } from './dto/update.product.dto';
import { PaginationDto } from 'src/dto/pagnation.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constant';
@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    console.log(createProductDto);
    const {
      sku,
      sellerId,
      categoryId
          
    } = createProductDto;
  
    try {
      const product = await this.prismaService.$transaction(async (prisma) => {
        // Check if sellerId exists
        const seller = await prisma.user.findUnique({
          where: { id: sellerId },
        });
        console.log('seller', seller);
        if (!seller) {
          throw new BadRequestException(`Seller with this id does not exist`);
        }
  
        // Check if main category exists
        const category = await prisma.category.findUnique({
          where: { id: categoryId },
        });

        console.log('category', category);
        if (!category) {
          throw new BadRequestException(`Category with this id does not exist`);
        }
  
       
  
        // Check if product with SKU exists
        const existingProduct = await prisma.product.findUnique({
          where: { sku },
        });
        console.log('existing product', existingProduct);
        if (existingProduct) {
          throw new BadRequestException(`Product with this SKU already exists`);
        }
  
        return await this.prismaService.product.create({
          data: {
            name: createProductDto.name,
            image: createProductDto.image,
            description: createProductDto.description,
            price: createProductDto.price,
            stock: createProductDto.stock,
            sku: createProductDto.sku,
            discount: createProductDto.discount,
            sellerId: createProductDto.sellerId,
            categoryId: createProductDto.categoryId,         
            status: createProductDto.status,
            ProductVariant: {
              create: createProductDto.ProductVariant.map(variant => ({
                stock: variant.stock,
                sku: variant.sku,
                price: variant.price,
                attribute: variant.attribute, 
              })),
            },
          },
          include: {
            
            ProductVariant: true,
          },
        });
      });
  
      return {
        statusCode: HttpStatus.CREATED,
        success: true,
        message: 'Product created successfully',
        data: product,
      };
    } catch (error) {
      console.log('error💥💥💥', error);
      throw error;
    }
  }

  async findAll() {
    return this.prismaService.product.findMany({include:{ProductVariant:true,category:true}});
  }

  async findOne(id: string) {
    console.log('id-', id);
    try {
      const product = await this.prismaService.product.findUnique({
        where: { id },
        include:{ProductVariant:true}
      });
      if (!product) {
        throw new BadRequestException('product is not found with this id');
      }
      return product;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findProductsBySeller(id: string) {
    console.log('id-', id);
    try {
      console.log('first');
      const product = await this.prismaService.product.findFirst({
        where: {
          sellerId: id,
        },
      });
      if (!product) {
        throw new BadRequestException('product is not found with this id');
      }
      return product;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getSubcategoryIds(categoryId: string): Promise<string[]> {
    const subcategories = await this.prismaService.category.findMany({
      where: { parentId: categoryId },
      select: { id: true },
    });
    console.log('subcategories',subcategories)

    const subcategoryIds = subcategories.map((sub) => sub.id);
    console.log('sub id',subcategoryIds)
    const nestedSubcategoryIds = await Promise.all(
      subcategoryIds.map((id) => this.getSubcategoryIds(id)),
    );
     console.log('nested sub id--',nestedSubcategoryIds)
    return [...subcategoryIds, ...nestedSubcategoryIds.flat()];
  }

  async findProductsByCatagory(categoryId:string , paginationDto:PaginationDto) {
    // Fetch the category details
    const category = await this.prismaService.category.findUnique({
      where: { id: categoryId },
      // select: { id: true, name: true },
    });
  
    if (!category) {
      throw new Error(`Category with ID ${categoryId} not found`);
    }
  
    // Fetch all subcategory IDs
    const subcategoryIds = await this.getSubcategoryIds(categoryId);
    const allCategoryIds = [categoryId, ...subcategoryIds];
  
    // Fetch products for the category and its subcategories
    const products = await this.prismaService.product.findMany({
      where: { categoryId: { in: allCategoryIds }  },
    
      orderBy: { createdAt: 'desc' },
          take:paginationDto.limit  ,
        skip:paginationDto.offset,
    });
  
    // Count total products
    const totalProducts = await this.prismaService.product.count({
      where: { categoryId: { in: allCategoryIds } },
    });
  
    return {
      // id: category.id,
      // name: category.name,
      products,
      totalProducts,
    };
  }
 
  async getRelatedProducts(subcategoryId: string, excludeProductId: string) {
  return this.prismaService.product.findMany({
    where: {
      categoryId: subcategoryId,
      id: { not: excludeProductId }, 
    },
    orderBy: { createdAt: 'desc' },
    // take: 4, 
  });
}


  async update(id: string, updateProductDto: UpdateProductDto) {
    // const { sellerId,sku,stock,status, ...updateData } = updateProductDto
    console.log(updateProductDto);
    //  try {
    //         let product = await this.prismaService.product.findUnique({
    //             where: {
    //               id,
    //             },
    //           });
    //           console.log(product);

    //           if (!product) {
    //             throw new NotFoundException(`no product found with this ${id}`);
    //           }
    //        product=await this.prismaService.product.update({
    //         where:{
    //             id
    //         },
    //         data:{updateProductDto},
    //         include: {
    //           seller: true,
    //           category: true,
    //           ProductVariant: true,
    //         },
    //        })
    //        return {
    //         statusCode: HttpStatus.OK,
    //         message: 'product updated successfully',
    //         data: product,
    //        }

    //     } catch (error) {
    //         console.log(error);
    //       throw error;
    //     }
  }

  async remove(id: string) {
    try {
      const product = await this.prismaService.product.findUnique({
        where: {
          id,
        },
      });
      console.log(product);
      if (!product) {
        throw new NotFoundException(`no product found with this ${id}`);
      }
      await this.prismaService.product.delete({
        where: { id },
      });

      return {
        message: 'product deleted successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
