import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Comment } from '../comment/comment.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  title: string;

  @Column('text')
  content: string;

  @Column({ length: 50, default: '익명' })
  authorName: string;

  @CreateDateColumn()
  createdAt: Date;

  // 댓글들과 1:N 관계
  @OneToMany(() => Comment, comment => comment.post, { cascade: true })
  comments: Comment[];
}
