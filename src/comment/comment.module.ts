// src/comment/comment.module.ts

import { Module }             from '@nestjs/common';
import { TypeOrmModule }      from '@nestjs/typeorm';
import { Comment }            from './comment.entity';
import { Post }               from '../post/post.entity';       // ← 추가
import { CommentService }     from './comment.service';
import { CommentController }  from './comment.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Comment,
      Post,    // ← 이 줄을 반드시 추가하세요
    ]),
  ],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
