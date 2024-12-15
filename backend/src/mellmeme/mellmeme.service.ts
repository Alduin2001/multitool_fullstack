import { Injectable } from '@nestjs/common';
import { CreateMellmemeDto } from './dto/create-mellmeme.dto';
import { UpdateMellmemeDto } from './dto/update-mellmeme.dto';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class MellmemeService {
  constructor(private prisma:PrismaService){}
  async create(createMellmemeDto: CreateMellmemeDto, filename:string,user:number) {
    try {
      const {name} = createMellmemeDto;
      const meme = await this.prisma.meme.create({data:{name:name,filename:filename,authorId:user}});
      return {msg:"Успешно создан мем"};
    } catch (error) {
      return {error};
    }
  }

  async findAll() {
    try {
      const memes = await this.prisma.meme.findMany({
        select:{
          id:true,
          name:true,
          filename:true,
          createdAt:true,
          author:{
            select:{
              id:true,
              name:true,
              surname:true
            }
          }
        }
      });
      return {memes};
    } catch (error) {
      return {error};
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} mellmeme`;
  }

  update(id: number, updateMellmemeDto: UpdateMellmemeDto) {
    return `This action updates a #${id} mellmeme`;
  }

  remove(id: number) {
    return `This action removes a #${id} mellmeme`;
  }
}
