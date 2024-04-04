import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './interface/cart.interface';
import { Model } from 'mongoose';
import { Product } from 'src/products/interface/product.interface';

@Injectable()
export class CartsService {
  constructor(
    @Inject('CART_MODEL') 
    private cartModel: Model<Cart>,
    @Inject('PRODUCT_MODEL')
    private productModel: Model<Product>,
  ) {}
  async create(createCartDto: CreateCartDto) {
    if (!createCartDto.productId) {
      throw new NotFoundException('Not have productId ');
    }
    try {
      const product = await this.productModel.findOne({
        _id: createCartDto.productId,
      });
      const existingCart = await this.cartModel.findOne({
        productId: product.id,
      });
      const existingCartByUser = await this.cartModel.findOne({
        email: createCartDto.email,
      });

      if (existingCart) {
        if (existingCartByUser) {
          console.log('existingCartByUser');
          const quantity = Number(createCartDto.quantity);
          existingCart.quantity += quantity;
          await existingCart.save();
          return existingCart;
        }
      }
      const newCart = await this.cartModel.create(createCartDto);
      return newCart;
    } catch (error) {
      console.log(error);
    }
    return 'This action adds a new cart';
  }

  findAll() {
    return this.cartModel.find();
  }

  async findOne(email: string) {
    const cart = await this.cartModel.find({ email: email });
    // console.log(cart);
    if (!cart) {
      throw new NotFoundException('No cart found');
    }
    return cart;
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    const cart = await this.cartModel.findOneAndUpdate(
      { _id: id },
      updateCartDto,
      { new: true },
    );
    if (!cart) {
      throw new NotFoundException('Product not found');
    }
    return cart;
  }

  async remove(id: string) {
    return await this.cartModel.deleteOne({ _id: id });
  }
}
