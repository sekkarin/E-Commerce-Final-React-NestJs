import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import JwtDto from './dto/jwt.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('jwt')
  @ApiOperation({ summary: 'Generate JWT token' })
  @ApiResponse({ status: 200, description: 'Returns access token' })
  @ApiResponse({ status: 400, description: 'Invalid email provided' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async jwt(@Res() res: Response, @Body() body: JwtDto) {
    const access_token = await this.authService.jwt(body);
    res.status(200).json({ access_token });
  }
}
