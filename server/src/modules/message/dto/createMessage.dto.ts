import { IsInt, IsString, IsNotEmpty } from 'class-validator';

class CreateMessageDto {
  @IsInt()
  chatId: number;

  @IsNotEmpty()
  @IsString()
  content: string;
}

export default CreateMessageDto;
