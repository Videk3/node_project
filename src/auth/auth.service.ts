import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(userFromRequest: User) {
    const { password, ...user } = await this.userService.findById(
      userFromRequest.id,
    );
    const payload = {
      email: user.email,
      sub: user.id,
    };
    const accessToken = this.jwtService.sign(payload);
    const tokenString = `Access_token=${accessToken}; HttpOnly; Path=/; Max-Age=1d`;
    return tokenString;
  }

  async validateUser(email: string, password: string): Promise<User> {
    console.log('Validating user...');
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }
    console.log('User is valid');
    return user;
  }

  /*async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Wrong email');
    }
    if (!(await bcrypt.compare(pass, user.password))) {
      throw new BadRequestException('Wrong password');
    }

    const payload = {
      email: user.email,
      sub: user.id,
    };
    const accessToken = this.jwtService.sign(payload);
    const tokenString = `Access_token=${accessToken}; HttpOnly; Path=/; Max-Age=1d`;
    return tokenString;
  }*/
}
