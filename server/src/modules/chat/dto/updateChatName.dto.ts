import { IsInt, IsString } from 'class-validator';

class UpdateChatNameDto {
  @IsInt()
  chatId: number;

  @IsString()
  name: string;
}

export default UpdateChatNameDto;
