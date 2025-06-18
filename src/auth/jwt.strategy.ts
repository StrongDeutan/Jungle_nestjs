// src/auth/jwt.strategy.ts

import { Injectable }           from '@nestjs/common';
import { PassportStrategy }     from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'YOUR_SECRET_KEY',
    });
  }

  async validate(payload: any) {
    // 요청이 인증되면 이 validate()가 리턴한 값이 req.user가 됩니다.
    return { userId: payload.sub, email: payload.email };
  }
}
