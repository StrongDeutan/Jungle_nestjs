// src/comment/dto/create-comment.dto.ts

import { IsString, Length, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @Length(1, 500, { message: '댓글은 최소 1자, 최대 500자까지 가능합니다.' })
  content: string;

  @IsOptional()
  @IsString()
  @Length(1, 50, { message: '작성자 이름은 1자 이상, 50자 이하로 입력해주세요.' })
  authorName?: string;
}
