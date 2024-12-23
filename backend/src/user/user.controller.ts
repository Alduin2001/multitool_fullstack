import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Res, Req } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import UserRequest from 'src/interfaces/user_id';
import { ApiBody, ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role, Roles } from 'src/guards/roles.';
@ApiTags('Пользователь')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiOperation({description:'Регистрация пользователя'})
  @ApiBody({type:CreateUserDto})
  @Post('register')
  create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @ApiOperation({description:'Аутентификация пользователя'})
  @ApiBody({type:LoginUserDto})
  @Post('login')
  async login(@Body(new ValidationPipe()) loginUserDto:LoginUserDto, @Res() res:Response){
    const jwt = await this.userService.login(loginUserDto);
    res.cookie('jwt',jwt,{httpOnly:true,sameSite:'lax',expires:new Date(Date.now()+1000*300)});
    return res.json({msg:"Success"});
  }
  @ApiOperation({description:'Выход из учётной записи'})
  @UseGuards(JwtGuard)
  @Post('logout')
  logout(@Res() response:Response){
    response.clearCookie('jwt');
    return response.status(200).json({msg:"Logout"});
  }
  @ApiOperation({description:'Получение списка пользователей'})
  @ApiCookieAuth()
  @Roles(Role.Admin)
  @UseGuards(JwtGuard,RolesGuard)
  @Get('getAll')
  findAll(@Req() req:UserRequest) {
    return this.userService.findAll();
  }

  @ApiOperation({description:'Вывод данных аутентифицированного пользователя'})
  @ApiCookieAuth('jwt')
  @UseGuards(JwtGuard)
  @Get('profile')
  profile(@Req() req:UserRequest){
    return this.userService.getProfile(req.user.id);
  }

  @ApiOperation({description:'Вывод данных аутентифицированного пользователя'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiOperation({description:'Обновление данных аутентифицированного пользователя'})
  @Patch('changeUser')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiCookieAuth('jwt')
  @ApiOperation({description:'Обновление профиля'})
  @UseGuards(JwtGuard)
  @Patch('updateProfile')
  @ApiBody({type:UpdateUserDto})
  updateProfile(updateUserDto:UpdateUserDto,@Req() req:UserRequest){
    return this.userService.updateProfile(req.user.id,updateUserDto);
  }

  @ApiCookieAuth('jwt')
  @ApiOperation({description:'Удаление профиля'})
  @UseGuards(JwtGuard)
  @Delete('profile_delete')
  deleteProfile(@Req() req:UserRequest){
    return this.userService.deleteProfile(req.user.id);
  }
  
  @ApiOperation({description:'Удаление пользователя'})
  @Roles(Role.Admin)
  @UseGuards(JwtGuard,RolesGuard)
  @Delete('any/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
