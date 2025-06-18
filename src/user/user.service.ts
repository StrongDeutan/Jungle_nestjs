// src/user/user.service.ts
import { Injectable }     from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }     from 'typeorm';
import { User }           from './user.entity';
import { CreateUserDto }  from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  // DB에 저장
  async create(dto: CreateUserDto): Promise<User> {
    const user = this.repo.create({
      name: dto.name,
      email: dto.email,
      passwordHash: dto.password, // 엔티티 내 @BeforeInsert 훅에서 해시 처리
    });
    return this.repo.save(user);
  }

  // DB에서 모두 조회
  async findAll(): Promise<User[]> {
    return this.repo.find();
  }
}
