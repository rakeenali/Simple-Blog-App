import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';

import { CreateBlogDto } from './dto/create-blog.dto';
import { BlogService } from './blog.service';
import { IBlog } from './interface/blog.interface';
import { ISuccess } from './interface/success.nterface';
import { AuthGuard } from '../guards/auth.guard';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get('/all')
  async findAll(): Promise<IBlog[]> {
    const blogs = await this.blogService.findAll();
    return blogs;
  }

  @Get('/:id')
  async findOne(@Param('id') blogId: string): Promise<IBlog> {
    const blog = await this.blogService.findOneBlog(blogId);
    return blog;
  }

  @Post('/create')
  @UseGuards(AuthGuard)
  async createBlog(
    @Body() createBlogDto: CreateBlogDto,
    @Request() req,
  ): Promise<IBlog> {
    const blog = await this.blogService.createBlog(createBlogDto, req._id);
    return blog;
  }

  @Post('/update/:id')
  @UseGuards(AuthGuard)
  async updateBlog(
    @Param('id') blogId: string,
    @Body() createBlogDto: CreateBlogDto,
    @Request() req,
  ): Promise<IBlog> {
    const blog = await this.blogService.updateBlog(
      blogId,
      createBlogDto,
      req._id,
    );
    return blog;
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async deleteBlog(
    @Param('id') blogId: string,
    @Request() req,
  ): Promise<ISuccess> {
    await this.blogService.deleteBlog(blogId, req._id);
    return {
      messsage: 'Blog deleted',
    };
  }
}
