import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }     from 'typeorm';
import * as bcrypt        from 'bcrypt';
import { User }          from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (user && await bcrypt.compare(pass, user.passwordHash)) {
      return user;
    }
    return null;
  }
}
