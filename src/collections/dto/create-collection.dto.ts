import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCollectionDto {
  @ApiProperty({ description: 'The name of the collection' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The unique slug for the collection' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiPropertyOptional({
    description: 'Optional description of the collection',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
