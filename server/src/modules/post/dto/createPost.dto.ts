import { IsString } from 'class-validator';

class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}

export default CreatePostDto;
