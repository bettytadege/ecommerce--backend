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
// import { SubCategoryModule } from './sub-category/sub-category.module';
// import { SubSubCategoryModule } from './sub-sub-category/sub-sub-category.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';
import { AddressModule } from './address/address.module';
import { PaymentModule } from './payment/payment.module';



@Module({
  
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath:'.env'
    }),
    CatagoryModule,
    ProductModule,
    ProductVariantModule,
    OrderModule,
    UserModule,
    OrderModule,
    CartModule,
    AddressModule,
    PaymentModule,
  ],

  controllers: [AppController, ProductVariantController],
  providers: [AppService, ProductVariantService],
})
export class AppModule {}
