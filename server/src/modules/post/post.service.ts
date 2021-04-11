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
import AddPostReactionDto from './dto/addPostReaction.dto';
import DeleteByPostAndUserIdsResponseDto from '../postReaction/dto/deletePostReactionResponse.dto';
import UserService from '../user/user.service';
import FriendshipService from '../friendship/friendship.service';
import PostReactionService from '../postReaction/postReaction.service';
import NotificationGateway from '../notification/events/notifications.event';

@Injectable()
class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private userService: UserService,
    private postReactionService: PostReactionService,
    private friendshipService: FriendshipService,
    private notificationGateway: NotificationGateway,
  ) {}

  async findById(id: number): Promise<Post | null> {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.reactions', 'reactions')
      .leftJoinAndSelect('reactions.type', 'reactionsType')
      .leftJoinAndSelect('reactions.user', 'reactionsUser')
      .leftJoinAndSelect('post.comments', 'comments')
      .leftJoinAndSelect('comments.author', 'commentsAuthor')
      .leftJoinAndSelect('comments.reactions', 'commentsReactions')
      .leftJoinAndSelect('commentsReactions.type', 'commentsReactionsType')
      .leftJoinAndSelect('commentsReactions.user', 'commentsReactionsUser')
      .where('post.id = :id', { id })
      .getOne();

    return post || null;
  }

  async findByFriendsIds(userId: number): Promise<Post[]> {
    const friendships = await this.friendshipService.findAccpetedByUserId(
      userId,
    );
    const friendsIds = friendships.map(({ requestedBy, addressedTo }) =>
      requestedBy.id === userId ? addressedTo.id : requestedBy.id,
    );

    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.reactions', 'reactions')
      .leftJoinAndSelect('reactions.type', 'reactionsType')
      .leftJoinAndSelect('reactions.user', 'reactionsUser')
      .leftJoinAndSelect('post.comments', 'comments')
      .leftJoinAndSelect('comments.author', 'commentsAuthor')
      .leftJoinAndSelect('comments.reactions', 'commentsReactions')
      .leftJoinAndSelect('commentsReactions.type', 'commentsReactionsType')
      .leftJoinAndSelect('commentsReactions.user', 'commentsReactionsUser')
      .where('author.id IN (:...friendsIds)', {
        friendsIds: [...friendsIds, userId],
      })
      .orderBy('post.createdAt', 'DESC')
      .getMany();

    return posts;
  }

  async createPost(userId: number, data: CreatePostDto): Promise<Post> {
    const user = await this.userService.findById(userId);
    if (!user) throw new NotFoundException('User not found!');

    const post = this.postRepository.create({
      ...data,
      author: user,
    });
    await this.postRepository.save(post);

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

  async addPostReaction(
    userId: number,
    { postId, reactionName }: AddPostReactionDto,
  ): Promise<Post> {
    const post = await this.findById(postId);
    if (!post) throw new NotFoundException('Post not found!');

    const foundReaction = await this.postReactionService.findByUserAndPostIds(
      userId,
      postId,
    );

    if (foundReaction) {
      const updatedReaction = await this.postReactionService.updatePostReaction(
        userId,
        foundReaction.id,
        reactionName,
      );
      post.reactions = post.reactions.map((reaction) =>
        reaction.id === updatedReaction.id ? updatedReaction : reaction,
      );
    } else {
      const postReaction = await this.postReactionService.createPostReaction(
        userId,
        reactionName,
      );
      post.reactions = [...post.reactions, postReaction];
    }

    await this.postRepository.save(post);

    if (!foundReaction && userId !== post.author.id) {
      this.notificationGateway.sendNotification({
        from: userId,
        to: post.author.id,
        targetId: post.id,
        notificationName: 'postReaction',
      });
    }

    return post;
  }

  async deletePostReaction(
    userId: number,
    postId: number,
  ): Promise<DeleteByPostAndUserIdsResponseDto> {
    return await this.postReactionService.deleteByPostAndUserIds(
      userId,
      postId,
    );
  }
}

export default PostService;
