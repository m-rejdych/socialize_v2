import { IsString, IsInt, IsIn, IsOptional } from 'class-validator';

class UpdateUserInfoDto {
  @IsOptional()
  @IsInt()
  age?: number | '';

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsIn(['Single', 'In relationship', 'Married', 'Divorced', ''])
  relationship?: 'Single' | 'In relationship' | 'Married' | 'Divorced' | '';
}

export default UpdateUserInfoDto;
