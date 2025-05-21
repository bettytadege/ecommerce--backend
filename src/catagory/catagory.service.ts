/* eslint-disable prettier/prettier */

import { PrismaService } from 'src/prisma/Prisma.service';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create.catagory.dto';
import { Category } from '@prisma/client';
import { UpdateCatagoryDto } from './dto/update.catagory.dto';
import { PaginationDto } from 'src/dto/pagnation.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constant';



@Injectable()
export class CatagoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    // console.log(createCategoryDto);
    try {
      // Check if a catagory with the same name for parentid is null

      const existingCatagory = await this.prismaService.category.findFirst({
        where: { name: createCategoryDto.name, parentId: null },
      });

      console.log('existing catagory', existingCatagory);
      if (createCategoryDto.parentId) {
        const parentCategory = await this.prismaService.category.findUnique({
          where: { id: createCategoryDto.parentId },
        });
  
        if (!parentCategory) {
          throw new BadRequestException('Invalid parentId: Parent category does not exist');
        }
      }
      if (existingCatagory) {
        throw new BadRequestException(
          'A catagory with this name already exists ',
        );
      }

      // Create the new catagory
      const category = await this.prismaService.category.create({
        data: {
          name: createCategoryDto.name,
          parentId: createCategoryDto.parentId,
        },
      });

      // console.log('new category', category);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Category created successfully',
        data: category,
      };
    } catch (error: any) {
      console.log('error💥💥', error);
      throw error;
    }
  }

  async getRootCategory(){
    
    const parent=await this.prismaService.category.findMany({
      where:{parentId:null}
    })
  
    // console.log('parent',parent)
    return parent
   }

  findAll() {
    return this.prismaService.category.findMany({
      where: {
        parentId: null,
      },
      include:{Product:true, children:{include:{children:true}}},
     
    });
  }

  //
    async  findOne(id: string):Promise<Category> {
      try {
        // console.log('id---------', id);
        const catagory = await this.prismaService.category.findUnique({
          where: {
            id,
          },
          include:{children:true}
        });
        console.log(catagory);
        if (!catagory) {
          throw new NotFoundException(`no catagory found with this id`);
        }
        return catagory;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
    //
   async update(id:string,updateCategoryDto:UpdateCatagoryDto){
      try {
          let category = await this.prismaService.category.findUnique({
              where: {
                id,
              },
            });
            // console.log(category);
            if (!category) {
              throw new NotFoundException(`no main category found with this ${id}`);
            }
         category=await this.prismaService.category.update({
          where:{
              id
          },
          data:updateCategoryDto
         })
         return {
          statusCode: HttpStatus.CREATED,
          message: 'category updated successfully',
          data: category,
         }

      } catch (error) {
          console.log(error);
        throw error;
      }
   }

    async remove(id:string){
      try {
          const category = await this.prismaService.category.findUnique({
              where: {
                id,
              },
            });
            // console.log(category);
            if (!category) {
              throw new NotFoundException(`no Category found with this ${id}`);
            }
            await this.prismaService.category.delete({
              where:{id}
            })

            return{
              message:"Category deleted successfully",
              statusCode:HttpStatus.OK
            }
      } catch (error) {
          console.log(error);
        throw error;
      }

    }

    async getCategoriesWithProducts() {
      // Fetch root categories
      const rootCategories = await this.prismaService.category.findMany({
        where: { parentId: null },
        select: { id: true, name: true },
        orderBy:{createdAt:'asc'},
        // take:paginationDto.limit ,
        // skip:paginationDto.offset,
      
      });
      // console.log('root',rootCategories)
  
      // Fetch products for each category
      const categoriesWithProducts = await Promise.all(
        rootCategories.map(async (category) => {
          
          const subcategoryIds = await this.getSubcategoryIds(category.id);
          // console.log('subcategoryies id--',subcategoryIds)
          const allCategoryIds = [category.id, ...subcategoryIds];
        //  console.log('all category id',allCategoryIds)
  
          // Fetch products for the category and its subcategorie
          const products = await this.prismaService.product.findMany({
            where: { categoryId: { in: allCategoryIds } },
            orderBy: { createdAt: 'desc' },
           });
  
          // Count total products
          const totalProducts = await this.prismaService.product.count({
            where: { categoryId: { in: allCategoryIds } },
          });
  
          return {
            id: category.id,
            name: category.name,
            products,
            totalProducts,
          };
        }),
      );
      
  
      return categoriesWithProducts;
    }
  
     async getSubcategoryIds(categoryId: string): Promise<string[]> {
      const subcategories = await this.prismaService.category.findMany({
        where: { parentId: categoryId },
        select: { id: true },
      });
      // console.log('subcategories',subcategories)
  
      const subcategoryIds = subcategories.map((sub) => sub.id);
      // console.log('sub id',subcategoryIds)
      const nestedSubcategoryIds = await Promise.all(
        subcategoryIds.map((id) => this.getSubcategoryIds(id)),
      );
      //  console.log('nested sub id--',nestedSubcategoryIds)
      return [...subcategoryIds, ...nestedSubcategoryIds.flat()];
    }
}
