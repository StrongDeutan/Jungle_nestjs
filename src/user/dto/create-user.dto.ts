// src/user/dto/create-user.dto.ts
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()               name: string;

  @IsEmail()                email: string;

  @IsString()
  @MinLength(6)             password: string;
}
