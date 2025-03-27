/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService :AuthService){}
@Post('signin')
    signIn(@Body('idToken') idToken:string){
        console.log('recieved idtoken',idToken)
        return this.authService.signIn(idToken)
    }
}
