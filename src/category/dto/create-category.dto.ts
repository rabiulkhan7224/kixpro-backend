import { IsString, IsOptional, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ description: 'The name of the category' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The unique slug for the category' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ description: 'description' })
  @IsString()
  @IsNotEmpty()
  description: string;
}
