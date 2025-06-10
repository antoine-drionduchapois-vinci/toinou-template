import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterRequestDto } from './dtos/register-request.dto';
import { contains } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }
    return user;
  }

  async login(email: string, password: string): Promise<Object> {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email, password: user.password };
    return { token: this.jwtService.sign(payload) };
  }

  async getCurrentUser(user: User) {
    try {
      const result = await this.usersRepository.findOneBy({ id: user.id });

      if (!result) {
        throw new NotFoundException(`User #${user.id} not found`);
      }

      return result;
    } catch (error) {
      throw error;
    }
  }
}
