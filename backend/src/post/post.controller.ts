import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Req, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import UserRequest from 'src/interfaces/user_id';
import { JwtGuard } from 'src/guards/jwt.guard';
import { ApiBody, ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Посты')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @ApiOperation({description:'Создание постов'})
  @ApiBody({type:CreatePostDto})
  @UseGuards(JwtGuard)
  @Post()
  create(@Body(new ValidationPipe()) createPostDto: CreatePostDto, @Req() req:UserRequest) {
    return this.postService.create(createPostDto,req.user.id);
  }
  @ApiOperation({description:'Получение постов'})
  @Get()
  findAll() {
    return this.postService.findAll();
  }
  @ApiOperation({description:'Получение одного определённого поста'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }
  @ApiOperation({description:'Обновление поста'})
  @ApiCookieAuth()
  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @Req() req:UserRequest) {
    return this.postService.update(+id, updatePostDto,req.user.id);
  }
  @ApiOperation({description:'Удаление поста'})
  @ApiCookieAuth()
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
