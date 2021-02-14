import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  UseGuards,
  ParseIntPipe,
  Body,
  Req,
  Param,
  Query,
} from '@nestjs/common';

import JwtGuard from '../../guards/jwt.guard';
import JwtRequest from '../auth/interfaces/jwtRequest.interface';
import CommentService from './comment.service';
import Comment from './comment.entity';
import CreateCommentDto from './dto/createComment.dto';
import UpdateCommentDto from './dto/updateComment.dto';
import DeleteCommentResponseDto from './dto/deleteCommentResponse.dto';

@Controller('comment')
class CommentController {
  constructor(private commentService: CommentService) {}

  @UseGuards(JwtGuard)
  @Get('get-comment/:id')
  async getComment(@Param('id', ParseIntPipe) id: number): Promise<Comment> {
    return await this.commentService.findById(id);
  }

  @UseGuards(JwtGuard)
  @Post('create-comment')
  async createComment(
    @Body() data: CreateCommentDto,
    @Req() req: JwtRequest,
  ): Promise<Comment> {
    const { id } = req.user;

    return await this.commentService.createComment(id, data);
  }

  @UseGuards(JwtGuard)
  @Put('update-comment')
  async updateComment(
    @Body() data: UpdateCommentDto,
    @Req() req: JwtRequest,
  ): Promise<Comment> {
    const { id } = req.user;

    return await this.commentService.updateComment(id, data);
  }

  @UseGuards(JwtGuard)
  @Delete('delete-comment')
  async deleteComment(
    @Query('commentId', ParseIntPipe) commentId: number,
    @Req() req: JwtRequest,
  ): Promise<DeleteCommentResponseDto> {
    const { id } = req.user;

    return await this.commentService.deleteComment(id, commentId);
  }
}

export default CommentController;
