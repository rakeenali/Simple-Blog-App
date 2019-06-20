import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IBlog } from './interface/blog.interface';

@Injectable()
export class BlogService {
  constructor(@InjectModel('Blog') private blogModel: Model<IBlog>) {}

  async findAll(): Promise<IBlog[]> {
    try {
      const blogs = await this.blogModel
        .find({})
        .sort('-createdAt')
        .populate('createdBy', 'name email')
        .lean()
        .exec();
      if (blogs && blogs.length > 0) {
        return blogs;
      }
      new Error('No blogs');
    } catch (err) {
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneBlog(blogId: string): Promise<IBlog> {
    try {
      const blog = await this.blogModel
        .findById(blogId)
        .populate('createdBy', 'name email')
        .lean()
        .exec();
      if (blog) {
        return blog;
      }
      throw new Error(`Blog with id ${blogId} does not exist`);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  async createBlog(Blog: IBlog, userId: string): Promise<IBlog> {
    try {
      const newBlog = await new this.blogModel({
        description: Blog.description,
        createdBy: userId,
      }).save();

      if (newBlog) {
        return newBlog;
      }
    } catch (err) {
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateBlog(
    blogId: string,
    blogData: IBlog,
    userId: string,
  ): Promise<IBlog> {
    try {
      const userMatch = await this.blogModel
        .findById(blogId)
        .select('createdBy')
        .lean()
        .exec();

      if (userMatch && userMatch.createdBy.toString() !== userId.toString()) {
        throw new HttpException(`Unauthorized action`, HttpStatus.UNAUTHORIZED);
      }

      const blog = await this.blogModel.findByIdAndUpdate(blogId, blogData, {
        new: true,
      });

      if (blog) {
        return blog;
      }
      throw new HttpException(
        `Blog with id ${blogId} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    } catch (err) {
      throw err;
    }
  }

  async deleteBlog(blogId: string, userId: string) {
    try {
      const matchBlog = await this.blogModel
        .findById(blogId)
        .select('createdBy')
        .lean()
        .exec();

      if (matchBlog && matchBlog.createdBy.toString() !== userId.toString()) {
        throw new HttpException(`Unauthorized action`, HttpStatus.UNAUTHORIZED);
      }

      const blog = await this.blogModel.findByIdAndDelete(blogId);
      if (blog) {
        return;
      }

      throw new HttpException(
        `Blog with id ${blogId} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    } catch (err) {
      throw err;
    }
  }
}
