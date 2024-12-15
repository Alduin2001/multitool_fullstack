import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { OperationSysService } from './operation_sys.service';
import { CreateOperationSyDto } from './dto/create-operation_sy.dto';
import { UpdateOperationSyDto } from './dto/update-operation_sy.dto';
import { Role, Roles } from 'src/guards/roles.';
import { JwtGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiCookieAuth } from '@nestjs/swagger';

@Controller('operation-sys')
export class OperationSysController {
  constructor(private readonly operationSysService: OperationSysService) {}

  @Post()
  @ApiCookieAuth()
  @Roles(Role.Admin)
  @UseGuards(JwtGuard,RolesGuard)
  create(@Body(new ValidationPipe()) createOperationSyDto: CreateOperationSyDto) {
    return this.operationSysService.create(createOperationSyDto);
  }

  @Get()
  findAll() {
    return this.operationSysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.operationSysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOperationSyDto: UpdateOperationSyDto) {
    return this.operationSysService.update(+id, updateOperationSyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.operationSysService.remove(+id);
  }
}
