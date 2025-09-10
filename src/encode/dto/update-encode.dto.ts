import { PartialType } from '@nestjs/mapped-types';
import { CreateEncodeDto } from './create-encode.dto';

export class UpdateEncodeDto extends PartialType(CreateEncodeDto) {}
