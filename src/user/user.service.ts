import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.findByEmail(createUserDto.email);
    if (user) {
      throw new BadRequestException('Email že obstaja');
    }
    const hashed = await bcrypt.hash(createUserDto.password, 10);
    const data = { ...createUserDto, password: hashed };

    try {
      const newUser: User = this.userRepository.create(data);
      return this.userRepository.save(newUser);
    } catch (e) {
      console.log(e);
      throw new BadRequestException('Napaka pri shranjevanju');
    }
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      await this.userRepository.update(id, updateUserDto);
      return await this.findById(id);
    } catch (e) {
      throw new BadRequestException('Napaka pri posodabljanju');
    }
  }
}
