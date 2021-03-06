import { IsEmail, IsString, Matches, IsNotEmpty } from 'class-validator';

class RegisterDto {
  @IsEmail()
  email: string;

  @Matches(/^(?=.*\d).{4,8}$/, {
    message:
      'Passoword must be between 4 and 8 characters long and contain letters and numbers!',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}

export default RegisterDto;
