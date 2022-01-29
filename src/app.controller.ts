import { Controller, Get, Post, Request, Req, Res, UseGuards } from '@nestjs/common';
import { JwtStrategy } from './auth/jwt-strategy';
import { AuthService } from './auth/auth.service';
import { verify } from 'jsonwebtoken';
import {jwtConstants} from './auth/constants'

@Controller('')
export class AppController {
  constructor(private readonly authService: AuthService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @UseGuards(JwtStrategy)
  @Get('user/profile')
  async getProfile(@Request() req) {
    
    const authToken = req.headers.authorization;
    let jwtToken = authToken.split(' ')[1];
    try{
      var result = await verify(jwtToken, jwtConstants.secret)
    }
    catch(err){
      console.log('Error while verifying JWT token', err);
    }
    return result;
  }
}
