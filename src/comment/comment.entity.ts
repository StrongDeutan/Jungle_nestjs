import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Post } from '../post/post.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @Column({ length: 50, default: '익명' })
  authorName: string;

  @CreateDateColumn()
  createdAt: Date;

  // Post 엔티티와 N:1 관계
  @ManyToOne(() => Post, post => post.comments, { onDelete: 'CASCADE' })
  post: Post;
}
