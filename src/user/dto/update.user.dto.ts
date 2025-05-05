/* eslint-disable prettier/prettier */
import { IsOptional } from 'class-validator';

import { Role, Status } from "@prisma/client";
import { IsEmail, IsEnum, IsString } from "class-validator";


export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;
  @IsEmail()
  @IsOptional()
  email:string
  @IsString()
  @IsOptional()
  phoneNumber?: string;
 @IsEnum(Status)
 @IsOptional()
  status:Status
 @IsEnum(Role)
 @IsOptional()
  role:Role

}