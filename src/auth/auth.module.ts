// src/auth/auth.module.ts

import { Module }               from '@nestjs/common';
import { TypeOrmModule }        from '@nestjs/typeorm';
import { PassportModule }       from '@nestjs/passport';
import { JwtModule }            from '@nestjs/jwt';

import { AuthController }       from './auth.controller';
import { AuthService }          from './auth.service';
import { JwtStrategy }          from './jwt.strategy';
import { User }                 from '../user/user.entity';
import { UserModule }           from '../user/user.module';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    // 유저 조회용
    UserModule,
    // JWT 전략을 Passport에 등록
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // JWT 모듈 설정: 시크릿과 만료시간은 환경변수로 관리하세요
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'YOUR_SECRET_KEY',
      signOptions: { expiresIn: '1h' },
    }),
    // 필요하다면 User 엔티티 직접 접근도 남겨둘 수 있습니다
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,     // 토큰 유효성 검사용 전략
    JwtAuthGuard,
  ],
  exports: [
    AuthService,     // 다른 모듈에서 로그인 서비스 사용할 때
    PassportModule,
    JwtModule,
    JwtAuthGuard,
  ],
})
export class AuthModule {}
