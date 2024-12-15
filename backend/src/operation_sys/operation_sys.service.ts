import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOperationSyDto } from './dto/create-operation_sy.dto';
import { UpdateOperationSyDto } from './dto/update-operation_sy.dto';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class OperationSysService {
  constructor(private prisma:PrismaService){}
  async create(createOperationSyDto: CreateOperationSyDto) {
    try {
      const oper_sys = await this.prisma.operSys.create({data:{...createOperationSyDto}});
      if(!oper_sys){
        throw new BadRequestException('Не удалось создать');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const oper_sys = await this.prisma.operSys.findMany();
      return {oper_sys};
    } catch (error) {
      return {error};
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} operationSy`;
  }

  update(id: number, updateOperationSyDto: UpdateOperationSyDto) {
    return `This action updates a #${id} operationSy`;
  }

  remove(id: number) {
    return `This action removes a #${id} operationSy`;
  }
}
