import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/config/prisma.service';
import { error } from 'console';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) { }
  async create(createPostDto: CreatePostDto, id: number) {
    try {
      const { header, body } = createPostDto;
      const post = await this.prisma.post.create({
        data: {
          header, body, authorPostId: id
        }
      });
      if(!post){
        throw new BadRequestException('Не удалось создать');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const post = await this.prisma.post.findMany();
      return {post};
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
