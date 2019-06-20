import { IsEmail, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsString({ message: 'Password field is required' })
  @Length(4, 20, {
    message: 'Password must be between 4 to 20 characters long',
  })
  readonly password: string;

  @IsEmail()
  readonly email: string;
}
