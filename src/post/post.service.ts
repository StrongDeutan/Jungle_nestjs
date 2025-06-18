import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }       from 'typeorm';
import { Post }             from './post.entity';
import { CreatePostDto }    from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}

  create(dto: CreatePostDto): Promise<Post> {
    const post = this.postRepo.create(dto);
    return this.postRepo.save(post);
  }

  findAll(): Promise<Post[]> {
    return this.postRepo.find({ relations: ['comments'] });
  }

  async remove(id: number): Promise<void> {
    const result = await this.postRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
  }
}
