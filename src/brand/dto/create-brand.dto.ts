import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty({
    description: 'The name of the brand',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    description: 'The name of the description',
  })
  @IsString()
  @Optional()
  description?: string;

  @ApiProperty({
    description: 'image url for the category banner image',
  })
  @IsString()
  @Optional()
  image?: string;
}
