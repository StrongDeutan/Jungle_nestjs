// src/auth/auth.controller.ts

import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService }                                  from './auth.service';
import { LoginDto }                                     from './dto/login.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    // 1) 유효성 검사: 이메일/비밀번호가 맞는지
    const user = await this.authService.validateUser(dto.email, dto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 2) JWT 토큰 발급
    const token = await this.authService.login(dto.email, dto.password);
    // token 형태: { access_token: '...' }

    // 3) 클라이언트로 반환
    return token;
  }
}
