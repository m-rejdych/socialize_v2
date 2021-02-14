import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Post from './post.entity';
import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';
import DeletePostResponseDto from './dto/deletePostResponse.dto';
import UserService from '../user/user.service';

@Injectable()
class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private userService: UserService,
  ) {}

  async findById(id: number): Promise<Post | null> {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.reactions', 'reactions')
      .leftJoinAndSelect('post.comments', 'comments')
      .where('post.id = :id', { id })
      .getOne();

    return post || null;
  }

  async createPost(userId: number, data: CreatePostDto): Promise<Post> {
    const user = await this.userService.findById(userId);
    if (!user) throw new NotFoundException('User not found!');

    const post = this.postRepository.create({
      ...data,
      author: user,
    });

    return post;
  }

  async updatePost(
    userId: number,
    { id, title, content }: UpdatePostDto,
  ): Promise<Post> {
    const post = await this.findById(id);
    if (!post) throw new NotFoundException('Post not found!');
    if (post.author.id !== userId) {
      throw new UnauthorizedException('You can update only your own posts!');
    }

    if (title) post.title = title;
    if (content) post.content = content;

    await this.postRepository.save(post);

    return post;
  }

  async deletePost(
    userId: number,
    postId: number,
  ): Promise<DeletePostResponseDto> {
    const post = await this.findById(postId);
    if (!post) throw new NotFoundException('Post not found!');
    if (post.author.id !== userId)
      throw new UnauthorizedException('You can delete only your own posts!');

    await this.postRepository.remove(post);

    return {
      postId,
      authorId: userId,
      deleted: true,
    };
  }
}

export default PostService;
