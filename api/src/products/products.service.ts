import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Product } from './interface/product.interface';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCT_MODEL')
    private productModel: Model<Product>,
  ) {}
  
  async getProducts() {
    return this.productModel.find();
  }
  async getProduct(productId: any) {
    return this.productModel.findOne({ _id: productId });
  }
  async createProduct(productDto: any) {
    const product = await this.productModel.create(productDto);
    return product;
  }
  async updateProduct(productId: string, productDto: any) {
    const productUpdate = await this.productModel.findByIdAndUpdate(
      productId,
      productDto,
      { new: true },
    );
    return productUpdate;
  }
  async deleteProduct(productId: string) {
    return await this.productModel.findOneAndDelete({ _id: productId });
  }
}
