/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CatagoryModule } from './catagory/catagory.module';
import { ProductModule } from './product/product.module';
import { ProductVariantController } from './product-variant/product-variant.controller';
import { ProductVariantService } from './product-variant/product-variant.service';
import { ProductVariantModule } from './product-variant/product-variant.module';

@Module({
  // imports: [AuthModule],
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath:'.env'
    }),
    CatagoryModule,
    ProductModule,
    ProductVariantModule,
  ],

  controllers: [AppController, ProductVariantController],
  providers: [AppService, ProductVariantService],
})
export class AppModule {}
