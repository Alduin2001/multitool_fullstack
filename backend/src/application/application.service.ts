import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class ApplicationService {
  constructor(private prisma:PrismaService){}
  async create(createApplicationDto: CreateApplicationDto,filename:string) {
    try {
      const {name,version,osType} = createApplicationDto;
      const app = await this.prisma.application.create({data:{
        name:name,
        version:version,
        operationSysId:osType,
        filePath:filename
      }});
      return HttpStatus.CREATED;
    } catch (error) {
      throw HttpStatus.BAD_GATEWAY;
    }
  }

  findAll() {
    return `This action returns all application`;
  }

  findOne(id: number) {
    return `This action returns a #${id} application`;
  }

  update(id: number, updateApplicationDto: UpdateApplicationDto) {
    return `This action updates a #${id} application`;
  }

  remove(id: number) {
    return `This action removes a #${id} application`;
  }
}
