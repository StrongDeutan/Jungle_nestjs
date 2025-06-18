// src/user/user.controller.ts
import { Controller, Post, Get, Body } from '@nestjs/common';
import { UserService }       from './user.service';
import { CreateUserDto }     from './dto/create-user.dto';
import { User }              from './user.entity';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 회원가입: POST /api/users
  @Post()
  async create(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.create(dto);
  }

  // 전체 조회: GET /api/users
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
