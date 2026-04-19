import { IsInt, IsOptional } from 'class-validator';

// import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetUsersParamDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;
}
