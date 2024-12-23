import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
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

  async findOne(id: number) {
    try {
      const post = await this.prisma.post.findFirst({where:{id},select:{
        header:true,
        body:true,
        createdAt:true
      }});
      if(!post){
        throw new BadRequestException('Пост не найден');
      }
      return {post};
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto, user_id:number) {
    try {
      const post = await this.prisma.post.update({where:{id:id,authorPostId:user_id},data:{...updatePostDto}});
      if(!post){
        throw new BadRequestException('Не удалось обновить');
      }
      return HttpStatus.OK;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
