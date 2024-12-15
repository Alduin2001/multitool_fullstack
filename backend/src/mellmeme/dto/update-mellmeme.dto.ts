import { PartialType } from '@nestjs/mapped-types';
import { CreateMellmemeDto } from './create-mellmeme.dto';

export class UpdateMellmemeDto extends PartialType(CreateMellmemeDto) {}
