import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { DatabaseModule } from 'src/database/database.module';
import { cartProviders } from './provider/cart.provider';
import { productProviders } from 'src/products/provider/product.provider';

@Module({
  controllers: [CartsController],
  providers: [CartsService, ...cartProviders, ...productProviders],
  imports: [DatabaseModule],
})
export class CartsModule {}
