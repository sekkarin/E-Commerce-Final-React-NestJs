import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import { User } from './dto/user.dto';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}
  @Get()
  @ApiResponse({ status: 200, description: 'Return all users.', type: [User] })
  getUsers() {
    return this.usersService.getUsers();
  }

  @ApiParam({ name: 'id', description: 'User ID', type: String })
  @ApiResponse({ status: 200, description: 'Return the user.', type: User })
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }
  @ApiParam({ name: 'email', description: 'User email', type: String })
  @ApiResponse({
    status: 200,
    description: 'Return whether the user is an admin.',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get('/admin/:email')
  getRoleAdmin(@Param('email') email: string) {
    return this.usersService.getAdmin(email);
  }

  @Post()
  @ApiBody({ type: User })
  @ApiResponse({ status: 200, description: 'Return the created user.' })
  createUser(@Body() body: any) {
    return this.usersService.createUser(body);
  }
  @Put(':id')
  @ApiParam({ name: 'id', description: 'User ID', type: String })
  @ApiBody({ type: User })
  @ApiResponse({ status: 200, description: 'Return the updated user.' })
  @ApiResponse({ status: 404, description: 'User not found' })
  updateUser(@Body() body: any, @Param('id') id: string) {
    return this.usersService.updateUser(id, body);
  }
  @Delete(':id')
  @ApiParam({ name: 'id', description: 'User ID', type: String })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
