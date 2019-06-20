import { IsString, IsNumberString, Length } from 'class-validator';

export class CreateBlogDto {
  @IsString({ message: 'Description field is required' })
  @Length(5, 100, {
    message: 'Description field must be between 5 to 100 characters long',
  })
  readonly description: String;

  readonly createdAt: Date;
}
