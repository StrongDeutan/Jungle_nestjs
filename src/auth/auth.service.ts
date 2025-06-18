// src/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository }                  from '@nestjs/typeorm';
import { Repository }                        from 'typeorm';
import * as bcrypt                           from 'bcrypt';
import { JwtService }                        from '@nestjs/jwt';
import { User }                              from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    // JwtService를 반드시 주입해 주세요
    private readonly jwtService: JwtService,
  ) {}

  /** 이메일·비밀번호 검증 */
  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (user && await bcrypt.compare(pass, user.passwordHash)) {
      return user;
    }
    return null;
  }

  /** 로그인: 토큰 발급 */
  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email };
    return {
    access_token: this.jwtService.sign(payload, {
      jwtid: String(user.id)   // 예: 유저 ID를 JTI로 사용하거나 uuid를 생성
    }),
  };
  }

  async blacklist(jti: string): Promise<{ success: true }> {
    console.log(`로그아웃 처리된 jti: ${jti}`);
    return { success: true };
  }
}
