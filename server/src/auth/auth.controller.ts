import { Body, Controller, Get, Post, Req, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dtos/register-request.dto';
import { contains } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { todo } from 'node:test';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body): Promise<Object> {
    console.log(body);
    return this.authService.login(body.user);
  }
  @Post('register')
  async register(@Body() registerBody: RegisterRequestDto): Promise<Object> {
    return await this.authService.register(registerBody);
  }

  /**
   *
   * @param user
   * @returns current user and the associated company
   */
  @Get('user')
  user(@Req() user: User) {
    // TODO test voir ce que renvoie le user
    console.log('req-user ; ', user);
    return this.authService.getCurrentUser(user);
  }
}
