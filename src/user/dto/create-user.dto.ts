import { IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Name field is required' })
  readonly name: string;

  @IsString({ message: 'Password field is required' })
  @Length(4, 20, {
    message: 'Password must be between 4 to 20 characters long',
  })
  readonly password: string;

  @IsEmail()
  readonly email: string;
}
