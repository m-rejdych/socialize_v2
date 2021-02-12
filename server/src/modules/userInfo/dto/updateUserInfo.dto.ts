import { IsString, IsInt, IsIn } from 'class-validator';

class UpdateUserInfoDto {
  @IsInt()
  age?: number;

  @IsString()
  country?: string;

  @IsString()
  city?: string;

  @IsIn(['Single', 'In relationship', 'Married', 'Divorced'])
  relationship?: 'Single' | 'In relationship' | 'Married' | 'Divorced';
}

export default UpdateUserInfoDto;
