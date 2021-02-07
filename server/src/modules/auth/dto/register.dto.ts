import { IsEmail, Matches } from 'class-validator';

class RegisterDto {
  @IsEmail()
  email: string;

  @Matches(/^(?=.*\d).{4,8}$/, {
    message:
      'Passoword must be between 4 and 8 characters and contain letters and numbers!',
  })
  password: string;
}

export default RegisterDto;
