import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/Product.dto';
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Return the list of products.', type: [CreateProductDto] })
  getProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Product ID', type: String })
  @ApiResponse({ status: 200, description: 'Return the product.', type: CreateProductDto })
  getProduct(@Param('id') id: string) {
    return this.productsService.getProduct(id);
  }
  @Post()
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Product created successfully', type: CreateProductDto })
  createProduct(@Body() body: any) {
    return this.productsService.createProduct(body);
  }

  @ApiParam({ name: 'id', description: 'Product ID', type: String })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 200, description: 'Product updated successfully', type: CreateProductDto })
  @Put(':id')
  updateProduct(@Body() body: any, @Param('id') id: any) {
    return this.productsService.updateProduct(id, body);
  }

  @ApiParam({ name: 'id', description: 'Product ID', type: String })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  @Delete(':id')
  deleteProduct(@Param('id') id: any) {
    return this.productsService.deleteProduct(id);
  }
}
