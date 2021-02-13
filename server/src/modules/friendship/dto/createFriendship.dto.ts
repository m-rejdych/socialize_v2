import { IsInt } from 'class-validator';

class CreateFriendshipDto {
  @IsInt()
  friendId: number;
}

export default CreateFriendshipDto;
