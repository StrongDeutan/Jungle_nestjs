// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';           // ← OK
import { UserService } from './user.service';   // ← ‘../user.service’ 가 아니라 ‘./user.service’
import { UserController } from './user.controller'; // ← 역시 ‘./user.controller’

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
