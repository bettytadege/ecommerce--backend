/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService :AuthService){}
@Post('google-signin')
googleSignIn(@Body('idToken') idToken:string){
        console.log('recieved idtoken',idToken)
        return this.authService.googleSignIn(idToken)
    }
    
    @Post('signin')
    signIn(@Body('idToken') idToken:string){
        return this.authService.signIn(idToken)
    }
    @Post('signup')
    signUp(@Body('idToken') idToken:string){
        return this.authService.signUp(idToken)
    }

}
