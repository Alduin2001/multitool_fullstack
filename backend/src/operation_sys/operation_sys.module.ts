import { Module } from '@nestjs/common';
import { OperationSysService } from './operation_sys.service';
import { OperationSysController } from './operation_sys.controller';
import { PrismaService } from 'src/config/prisma.service';

@Module({
  controllers: [OperationSysController],
  providers: [OperationSysService,PrismaService],
})
export class OperationSysModule {}
