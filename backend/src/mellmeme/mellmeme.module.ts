import { Module } from '@nestjs/common';
import { MellmemeService } from './mellmeme.service';
import { MellmemeController } from './mellmeme.controller';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaService } from 'src/config/prisma.service';

@Module({
  imports:[
    
  ],
  controllers: [MellmemeController],
  providers: [MellmemeService, PrismaService],
})
export class MellmemeModule {}
