import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { DatabaseModule } from 'src/database/database.module';
import { productProviders } from './provider/product.provider';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ...productProviders],
  imports: [DatabaseModule],
})
export class ProductsModule {}
