import { PartialType } from '@nestjs/mapped-types';
import { CreateVariantDto } from './CreateVariant.dto';

export class UpdateVariantDto extends PartialType(CreateVariantDto) {}
