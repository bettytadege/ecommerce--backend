/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;
  
  @IsUUID()
  userId: string;


  @IsOptional() 
//   @IsPostalCode(any)
  postalCode: string;
}
