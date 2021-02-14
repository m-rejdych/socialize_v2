import { IsInt, IsString, IsNotEmpty } from 'class-validator';

class UpdateCommentDto {
  @IsInt()
  commentId: number;

  @IsString()
  @IsNotEmpty()
  content: string;
}

export default UpdateCommentDto;
