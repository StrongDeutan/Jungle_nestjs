// src/comment/comment.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository }              from '@nestjs/typeorm';
import { Repository }                    from 'typeorm';
import { Comment }                       from './comment.entity';
import { CreateCommentDto }              from './dto/create-comment.dto';
import { Post }                          from '../post/post.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}

  /**
   * 주어진 postId의 게시글이 있으면, DTO를 합쳐 바로 save() 호출
   */
  async create(postId: number, dto: CreateCommentDto): Promise<Comment> {
    const post = await this.postRepo.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException(`Post with id ${postId} not found`);
    }

    const comment = await this.commentRepo.save({
      content: dto.content,
      // DTO에 authorName 필드를 추가했다면 dto.authorName 사용
      authorName: dto.authorName ?? '익명',
      post,
    });

    return comment;
  }

  /**
   * 특정 게시글(postId)에 달린 댓글 전체 조회
   */
  async findByPost(postId: number): Promise<Comment[]> {
    return this.commentRepo.find({
      where: { post: { id: postId } },
      order: { createdAt: 'ASC' },
    });
  }
}
