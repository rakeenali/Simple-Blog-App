import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { IUser, IToken, ILogin } from './interface/User.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  async registerUser(userData: IUser): Promise<IUser> {
    try {
      const userExist = await this.userModel.findOne({ email: userData.email });

      if (userExist) {
        throw new HttpException(
          `User with this email ${userData.email} already exist`,
          HttpStatus.CONFLICT,
        );
      }

      const salt = await bcrypt.genSalt(10);

      if (!salt) {
        throw new HttpException(
          'Salt creation error occured',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const password = await bcrypt.hash(userData.password, salt);

      const user = await new this.userModel({
        name: userData.name,
        email: userData.email,
        password: password,
      });
      await user.save();

      if (user) {
        return user;
      }

      throw new HttpException(
        'User creation error occured',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } catch (err) {
      throw err;
    }
  }

  async login(userData: ILogin): Promise<IToken> {
    try {
      const user = await this.userModel
        .findOne({ email: userData.email })
        .lean()
        .exec();

      if (!user) {
        throw new HttpException(
          `User with email ${userData.email} does not exist`,
          HttpStatus.NOT_FOUND,
        );
      }

      const matchPassword = await bcrypt.compare(userData.password,user.password);

      if(!matchPassword){
        throw new HttpException(
          `Invalid password`,
          HttpStatus.CONFLICT,
        );
      }

      const sign = jwt.sign({ name: user.name, _id: user._id }, 'secret', {
        expiresIn: 60 * 60,
      });

      return {
        token: sign,
      };
    } catch (err) {
      throw err;
    }
  }
}
