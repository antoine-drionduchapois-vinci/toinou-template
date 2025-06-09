import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      let newUser = this.usersRepository.create(createUserDto);

      // Validate duplicated email
      if (createUserDto.email) {
        const existingUser = await this.usersRepository.findOne({
          where: { email: createUserDto.email },
        });
        if (existingUser) {
          throw new BadRequestException('Email already in use');
        }
      }

      newUser = await this.usersRepository.save(newUser);

      return newUser;
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOneByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.usersRepository.findOneBy({ email: email });
      if (!user) {
        return null;
      }
      return user;
    } catch (err) {
      throw err;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
