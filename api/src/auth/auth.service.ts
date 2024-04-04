import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenExpiredError } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { NOTFOUND } from 'dns';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UsersService,
  ) {}
  async jwt(body: any) {
    try {
      const userExisting = await this.userService.findUser(body.email);
      if (!userExisting) {
        throw new NotFoundException('User  not found');
      }
      try {
        const payload = {
          ...body,
          role: userExisting.role,
          id: userExisting.id,
        };
        const access_token = await this.jwtService.signAsync(payload, {
          expiresIn: this.configService.get<string>('EXPIRES_IN_ACCESS_TOKEN'),
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        });
        return access_token;
      } catch (error) {
        throw new ForbiddenException();
      }
    } catch (error) {
      console.log(error);

      if (error instanceof TokenExpiredError) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
