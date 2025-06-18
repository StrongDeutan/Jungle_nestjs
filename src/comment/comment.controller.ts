// src/comment/comment.controller.ts

import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards
} from '@nestjs/common';
import { CommentService }      from './comment.service';
import { CreateCommentDto }    from './dto/create-comment.dto';
import { Comment }             from './comment.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/posts/:postId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  /** 특정 게시글의 댓글 전체 조회 */
  @UseGuards(JwtAuthGuard)
  @Get()
  async findByPost(
    @Param('postId', ParseIntPipe) postId: number,
  ): Promise<Comment[]> {
    return this.commentService.findByPost(postId);
  }

  /** 댓글 작성 */
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() dto: CreateCommentDto,
  ): Promise<Comment> {
    return this.commentService.create(postId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':commentId')
        remove(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
  ): Promise<void> {
    return this.commentService.remove(postId, commentId);
  }
}
