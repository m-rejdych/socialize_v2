import { IsString, IsOptional, IsInt } from 'class-validator';

class UpdatePostDto {
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;
}

export default UpdatePostDto;
