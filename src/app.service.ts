/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
     return {
    message: 'please check the documentations',
    data: '/api',
  };
  }
}
