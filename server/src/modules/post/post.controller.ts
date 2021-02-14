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
import DeletePostResponseDto from './dto/deletePostResponse.dto';
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
}

export default PostController;
