import {
  Controller,
  UseGuards,
  Post,
  Put,
  Get,
  Delete,
  Body,
  Param,
  Query,
  Req,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';

import JwtGuard from '../../guards/jwt.guard';
import PostService from './post.service';
import JwtRequest from '../auth/interfaces/jwtRequest.interface';
import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';
import AddPostReactionDto from './dto/addPostReaction.dto';
import DeletePostResponseDto from './dto/deletePostResponse.dto';
import DeleteByPostAndUserIdsResponseDto from '../postReaction/dto/deletePostReactionResponse.dto';
import PostEntity from './post.entity';

@Controller('post')
class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(JwtGuard)
  @Get('get-post/:id')
  async getPost(
    @Param('id', ParseIntPipe) postId: number,
  ): Promise<PostEntity> {
    const post = await this.postService.findById(postId);
    if (!post) throw new NotFoundException();

    return post;
  }

  @UseGuards(JwtGuard)
  @Get('get-feed')
  async getFeed(@Req() req: JwtRequest): Promise<PostEntity[]> {
    const { id } = req.user;

    return await this.postService.findByFriendsIds(id);
  }

  @UseGuards(JwtGuard)
  @Post('create-post')
  async createPost(
    @Body() data: CreatePostDto,
    @Req() req: JwtRequest,
  ): Promise<PostEntity> {
    const { id } = req.user;

    return await this.postService.createPost(id, data);
  }

  @UseGuards(JwtGuard)
  @Put('update-post')
  async updatePost(
    @Body() data: UpdatePostDto,
    @Req() req: JwtRequest,
  ): Promise<PostEntity> {
    const { id } = req.user;

    return await this.postService.updatePost(id, data);
  }

  @UseGuards(JwtGuard)
  @Delete('delete-post')
  async deletePost(
    @Query('postId', ParseIntPipe) postId: number,
    @Req() req: JwtRequest,
  ): Promise<DeletePostResponseDto> {
    const { id } = req.user;

    return await this.postService.deletePost(id, postId);
  }

  @UseGuards(JwtGuard)
  @Put('add-reaction')
  async addReaction(
    @Body() data: AddPostReactionDto,
    @Req() req: JwtRequest,
  ): Promise<PostEntity> {
    const { id } = req.user;

    return await this.postService.addPostReaction(id, data);
  }

  @UseGuards(JwtGuard)
  @Delete('delete-reaction')
  async deleteReaction(
    @Query('postId', ParseIntPipe) postId: number,
    @Req() req: JwtRequest,
  ): Promise<DeleteByPostAndUserIdsResponseDto> {
    const { id } = req.user;

    return await this.postService.deletePostReaction(id, postId);
  }
}

export default PostController;
