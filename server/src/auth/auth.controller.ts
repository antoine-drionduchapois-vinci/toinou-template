import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dtos/register-request.dto';
import { contains } from 'class-validator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body): Promise<Object> {
    return this.authService.login(body.user);
  }
  @Post('register')
  async register(@Body() registerBody: RegisterRequestDto): Promise<Object> {
    return await this.authService.register(registerBody);
  }
}
