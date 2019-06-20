import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as jwt from 'jsonwebtoken';

import { IUser } from '../user/interface/User.interface';
import { IPayload } from './payload.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  @InjectModel('User') private userModel: Model<IUser>;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      if (!request.headers.authorization) {
        throw new HttpException('Token doesnot exist', HttpStatus.UNAUTHORIZED);
      }

      const [, token] = request.headers.authorization.split(' ');
      if (!token) {
        throw new HttpException('Token doesnot exist', HttpStatus.UNAUTHORIZED);
      }

      const payload: IPayload = jwt.verify(token, 'secret');

      const currentTime = Date.now() / 1000;

      if (payload.exp > currentTime) {
        const user = await this.userModel
          .findOne({ _id: payload._id })
          .select('_id')
          .lean()
          .exec();

        if (!user) {
          throw new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED);
        }

        request._id = user._id;
        return true;
      }

      throw new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED);
    } catch (err) {
      throw err;
    }
  }
}
