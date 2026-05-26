import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCollectionDto {
  @ApiProperty({ description: 'The name of the collection' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: 'Optional description of the collection',
  })
  @IsString()
  @IsOptional()
  description?: string;
  @ApiPropertyOptional({
    description: 'Optional image URL for the collection banner',
  })
  @IsString()
  @IsOptional()
  image?: string;
}
