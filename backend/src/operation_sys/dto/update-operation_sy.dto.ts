import { PartialType } from '@nestjs/swagger';
import { CreateOperationSyDto } from './create-operation_sy.dto';

export class UpdateOperationSyDto extends PartialType(CreateOperationSyDto) {}
