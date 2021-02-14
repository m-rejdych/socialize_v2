import { IsString, IsNotEmpty, IsInt } from 'class-validator';

class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsInt()
  postId: number;
}

export default CreateCommentDto;
