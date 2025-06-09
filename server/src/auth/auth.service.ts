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

  async login(user: User): Promise<Object> {
    const payload = { email: user.email, id: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(user: RegisterRequestDto): Promise<Object> {
    try {
      const existingUser = await this.usersService.findOneByEmail(user.email);
      if (existingUser) {
        throw new BadRequestException('email already exists');
      }
      const newUser = new User({
        ...user,
      });

      await this.usersService.create(newUser);
      return this.login(newUser);
    } catch (err) {
      throw err;
    }
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
