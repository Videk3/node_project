import { Controller, Post, UseGuards, Request, Get, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { JwtAuthGuard } from './guards/jwtAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async signIn(@Request() req, @Res() res: Response) {
    const jwt = await this.authService.signIn(req.user);
    res.setHeader('Set-Cookie', [jwt]).json();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Request() req) {
    return req.user;
  }
  @Post('logout')
  logout(@Request() req) {
    req.res.setHeader(
      'Set-Cookie',
      `Access_token=; HttpOnly; Path=/; Max-Age=0`,
    );
  }
}
