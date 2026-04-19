import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMediaDto {
  @ApiProperty({ description: 'The URL of the media file' })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({ description: 'The type of media (e.g., image, video)' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    description: 'The ID of the product this media is associated with',
  })
  @IsUUID()
  @IsNotEmpty()
  productId: string;
}
