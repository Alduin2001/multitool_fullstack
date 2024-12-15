import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req, UseGuards } from '@nestjs/common';
import { MellmemeService } from './mellmeme.service';
import { CreateMellmemeDto } from './dto/create-mellmeme.dto';
import { UpdateMellmemeDto } from './dto/update-mellmeme.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtGuard } from 'src/guards/jwt.guard';
import UserRequest from 'src/interfaces/user_id';

@Controller('mellmeme')
export class MellmemeController {
  constructor(private readonly mellmemeService: MellmemeService) {}
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/mellstroy',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
        callback(null, filename);
      }
    })
  }))
  @Post('create')
  create(@Body() createMellmemeDto: CreateMellmemeDto, @UploadedFile() file:Express.Multer.File, @Req() req:any) {
    const user:number = req.user.id;
    const filename = file.filename;
    return this.mellmemeService.create(createMellmemeDto,filename,user);
  }

  @Get()
  findAll() {
    return this.mellmemeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mellmemeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMellmemeDto: UpdateMellmemeDto) {
    return this.mellmemeService.update(+id, updateMellmemeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mellmemeService.remove(+id);
  }
}