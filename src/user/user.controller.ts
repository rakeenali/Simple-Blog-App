import { Controller, Get, Body, Post } from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { IUser, IToken } from './interface/User.interface';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async registerUser(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    const user = await this.userService.registerUser(createUserDto);

    return user;
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<IToken> {
    const token = await this.userService.login(loginUserDto);
    return token;
  }
}
