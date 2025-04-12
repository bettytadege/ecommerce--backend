/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FirebaseAdminService } from 'src/firebase/firebase.admin.service';
import { PrismaService } from 'src/prisma/Prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly firebaseService: FirebaseAdminService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async googleSignIn(idtoken: string) {
    try {
      console.log(idtoken)
        const decodeToken = await this.firebaseService.verifyToken(idtoken);
        console.log('token:', decodeToken);
        const { email,name, uid ,picture} = decodeToken;
    
        let user = await this.prismaService.user.findUnique({
          where: {
                firebaseUid: uid,
            },
        });
       
        console.log('user',user);
        if (!user) {
          user = await this.prismaService.user.create({
            data: {
              email: email ?? '', 
              name: name ?? '', 
              firebaseUid: uid, 
              role: 'user',
              status:'active'
            },
          });
        }
        const payload={id:user.id}
        const token=this.jwtService.sign(payload)
        console.log('jwt token',token)
        return { user,token };
        // return{message:"plz signin"}
      }
        
    
    catch (error) {
      console.log('error🔥',error)
         throw new UnauthorizedException(error)
    }
   
}
  async signUp(idtoken: string) {
    try {
      console.log(idtoken)
        const decodeToken = await this.firebaseService.verifyToken(idtoken);
        console.log('token:', decodeToken);
        const { email,name, uid ,} = decodeToken;
    
        let user = await this.prismaService.user.findUnique({
          where: {
               email
            },
        });
        
        console.log('user',user)
       
        console.log('user',user);
        if (!user) {
          user = await this.prismaService.user.create({
            data: {
              email: email ?? '', 
              name: name ?? '', 
              firebaseUid: uid, 
              role: 'user',
              status:'active'
            },
          });
        }
        const payload={id:user.id}
        const token=this.jwtService.sign(payload)
        console.log('jwt token',token)
        return { user,token };
        // return{message:"plz signin"}
      }
        
    
    catch (error) {
      if(error.code === 'auth/email-already-exists'){
        throw new BadRequestException('Email already exist')
      }
      console.log('error🔥',error)
         throw new UnauthorizedException(error)
    }
   
}

async signIn(idtoken: string) {
  try {
    console.log(idtoken)
      const decodeToken = await this.firebaseService.verifyToken(idtoken);
      console.log('token:', decodeToken);
      const { email} = decodeToken;
  
      const user = await this.prismaService.user.findUnique({
        where: {
             email
          },
      });
      
      console.log('user',user)
     if(!user){
      throw new NotFoundException('user is not found')
     }
     
      const payload={id:user.id}
      const token=this.jwtService.sign(payload)
      console.log('jwt token',token)
      return { user,token };
      // return{message:"plz signin"}
    }
      
  
  catch (error) {
    
    console.log('error🔥',error)
    console.error('Sign-in error:', error);
    if (error instanceof NotFoundException) {
      throw error;
    }
    throw new UnauthorizedException('Invalid or expired token');
  
  }
 
}
}
