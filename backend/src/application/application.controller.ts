import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role, Roles } from 'src/guards/roles.';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Roles(Role.Admin)
  @UseGuards(JwtGuard,RolesGuard)
  @UseInterceptors(FileInterceptor('file',{
    storage:diskStorage({
      destination:'./uploads/applications',
      filename(req, file, callback) {
        const filename = `${Date.now}-${file.originalname}`;
        callback(null,filename);
      },
    })
  }))
  @Post()
  create(@Body(new ValidationPipe()) createApplicationDto: CreateApplicationDto,@UploadedFile() file:Express.Multer.File,@Req() req:any) {
    const app_package = file.filename;
    return this.applicationService.create(createApplicationDto,app_package);
  }

  @Get()
  findAll() {
    return this.applicationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApplicationDto: UpdateApplicationDto) {
    return this.applicationService.update(+id, updateApplicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationService.remove(+id);
  }
}
