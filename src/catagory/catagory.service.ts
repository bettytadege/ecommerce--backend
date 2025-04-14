/* eslint-disable prettier/prettier */




import { PrismaService } from 'src/prisma/Prisma.service';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
 
} from '@nestjs/common';
import { CreateMainCategoryDto } from './dto/create.catagory.dto'
import { MainCategory } from '@prisma/client';
import { UpdateMainCatagoryDto } from './dto/update.catagory.dto';


@Injectable()
export class CatagoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createMainCategoryDto: CreateMainCategoryDto) {
    console.log(createMainCategoryDto)
    try {
      // Check if a catagory with the same name 

      const existingCatagory = await this.prismaService.mainCategory.findUnique({
        where:{name:createMainCategoryDto.name}
      })
     

      console.log('existing catagory', existingCatagory);

      if (existingCatagory) {
        throw new BadRequestException(
          'A catagory with this name already exists ',
        );
      }

      // Create the new catagory
      const category = await this.prismaService.mainCategory.create({
        data:{name:createMainCategoryDto.name}
      })
       

      console.log('new category', category);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Category created successfully',
        data: category,
      
    } 
  }
  catch (error: any) {
      console.log('error💥💥', error);
      throw error;
    }
  
  }

  

  async findAll() {
    return  this.prismaService.mainCategory.findMany(
      {
        include:{subCategories:{include:{subSubCategories:true}},products:true}
      }
    )
  }
  
//
  async  findOne(id: string):Promise<MainCategory> {
    try {
      console.log('id---------', id);
      const catagory = await this.prismaService.mainCategory.findUnique({
        where: {
          id,
        },
        include:{subCategories:true}
      });
      console.log(catagory);
      if (!catagory) {
        throw new NotFoundException(`no catagory found with this ${id}`);
      }
      return catagory;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  //
 async update(id:string,updateCategoryDto:UpdateMainCatagoryDto){
    try {
        const mainCategory = await this.prismaService.mainCategory.findUnique({
            where: {
              id,
            },
          });
          console.log(mainCategory);
          if (!mainCategory) {
            throw new NotFoundException(`no main category found with this ${id}`);
          }
      const category=await this.prismaService.mainCategory.update({
        where:{
            id
        },
        data:updateCategoryDto
       })
       return {
        statusCode: HttpStatus.CREATED,
        message: 'catagory updated successfully',
        data: category,
       }
    

        
    } catch (error) {
        console.log(error);
      throw error;
    }
 }
 
  async remove(id:string){
    try {
        const mainCategory = await this.prismaService.mainCategory.findUnique({
            where: {
              id,
            },
          });
          console.log(mainCategory);
          if (!mainCategory) {
            throw new NotFoundException(`no Category found with this ${id}`);
          }
          await this.prismaService.mainCategory.delete({
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

}