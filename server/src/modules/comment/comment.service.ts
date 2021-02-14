import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Comment from './comment.entity';
import CreateCommentDto from './dto/createComment.dto';
import DeleteCommentResponseDto from './dto/deleteCommentResponse.dto';
import UpdateCommentDto from './dto/updateComment.dto';
import PostService from '../post/post.service';
import UserService from '../user/user.service';

@Injectable()
class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    private postService: PostService,
    private userService: UserService,
  ) {}

  async findById(commentId: number): Promise<Comment | null> {
    const comment = await this.commentRepository.findOne(commentId, {
      relations: [
        'author',
        'post',
        'reactions',
        'reactions.user',
        'reactions.type',
      ],
    });

    return comment || null;
  }

  async createComment(
    userId: number,
    { content, postId }: CreateCommentDto,
  ): Promise<Comment> {
    const user = await this.userService.findById(userId);
    if (!user) throw new NotFoundException('User not found!');

    const post = await this.postService.findById(postId);
    if (!post) throw new NotFoundException('User not found!');

    const comment = this.commentRepository.create({
      content,
      post,
      author: user,
    });
    await this.commentRepository.save(comment);

    return comment;
  }

  async updateComment(
    userId: number,
    { commentId, content }: UpdateCommentDto,
  ): Promise<Comment> {
    const comment = await this.findById(commentId);
    if (!comment) throw new NotFoundException('Comment not found!');
    if (comment.author.id !== userId) {
      throw new UnauthorizedException('You can update only your own comments!');
    }

    comment.content = content;
    await this.commentRepository.save(comment);

    return comment;
  }

  async deleteComment(
    userId: number,
    commentId: number,
  ): Promise<DeleteCommentResponseDto> {
    const comment = await this.findById(commentId);
    if (!comment) throw new NotFoundException('Comment not found!');
    if (comment.author.id !== userId) {
      throw new UnauthorizedException('You can delete only your own comments!');
    }

    const postId = comment.post.id;

    await this.commentRepository.remove(comment);

    return {
      commentId,
      postId,
      authorId: userId,
      deleted: true,
    };
  }
}

export default CommentService;
