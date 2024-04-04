import {
  Body,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';

import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}
  async findUser(email: string) {
    return this.userModel.findOne({ email: email });
  }
  async createUser(@Body() crateUserDto: any) {  
    const userAlreadyExists = await this.userModel.findOne({
      email: crateUserDto?.email,
    });
    if (userAlreadyExists) {
      throw new HttpException('email has been used', HttpStatus.FOUND);
    }
    const createdUser = new this.userModel({
      ...crateUserDto,
    });
    await createdUser.save();
    return createdUser;
  }
  async getUsers() {
    return await this.userModel.find();
  }
  async getUser(userId: string) {
    return await this.userModel.findOne({ _id: userId });
  }
  async getAdmin(email: string) {
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    let isAdmin = false;
    if (user.role === 'admin') {
      isAdmin = true;
    }
    return {isAdmin};
  }
  async changeRoleUser(userId: string) {
    const user = await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        role: 'user',
      },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async changeRoleAdmin(userId: string) {
    const user = await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        role: 'admin',
      },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async updateUser(userId: string, updateUserDto: any) {
    const user = await this.userModel.findByIdAndUpdate(
      { _id: userId },
      updateUserDto,
      { new: true },
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async deleteUser(userId: string){
    return await this.userModel.deleteOne({_id:userId})
  }

}
