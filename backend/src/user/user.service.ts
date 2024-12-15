import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/config/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstant } from 'src/config/jwtConstant';

@Injectable()
export class UserService {
  constructor(
    private prisma:PrismaService,
    private jwt:JwtService
  ){}
  async create(createUserDto: CreateUserDto) {
    try {
      const {name,surname,login,password} = createUserDto;
      const findedByLogin = await this.prisma.user.findUnique({where:{login:login}});
      if(findedByLogin){
        throw new BadRequestException('Такой пользователь уже существует');
      }
      const hashed = await bcrypt.hash(password,5);
      await this.prisma.user.create({data:{
        name:name,
        surname:surname,
        login:login,
        password:hashed
      }});
      return {msg:"Пользователь создан"};
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async login(loginUserDto:LoginUserDto){
    try {
      const {login,password} = loginUserDto;
      const finded = await this.prisma.user.findUnique({where:{login:login}});
      if(!finded){
        throw new BadRequestException('Пользователь не найден');
      }
      const findedByPass = await bcrypt.compare(password,finded.password);
      if(!findedByPass){
        throw new BadRequestException('Пользователь не найден');
      }
      const payload = {
        id:finded.id,
        role:finded.role
      }
      const token = await this.jwt.signAsync(payload,{secret:jwtConstant.secret});
      return token;
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
  async getProfile(id:number){
    try {
      const profile = await this.prisma.user.findFirst({where:{id},select:{
        name:true,
        surname:true,
        login:true
      }});
      if(!profile){
        throw new BadRequestException('Пользователя не существует');
      }
      return profile;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async deleteProfile(id:number){
    try {
      const profile = await this.prisma.user.delete({where:{id}});
      if(!profile){
        throw new BadRequestException('Не удалось удалить профиль');
      }
    } catch (error) {
        throw new BadRequestException(error.message);
    }
  }
  async findAll() {
    const user = await this.prisma.user.findMany();
    return {user};
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
