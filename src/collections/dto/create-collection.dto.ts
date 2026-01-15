import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length, MaxLength, MinLength } from "class-validator";

export class CreateCollectionDto {
  @ApiProperty({ description: 'Collection name', minLength: 3, maxLength: 96 })
   @IsString()
    @IsNotEmpty({ message: 'name cannot be empty.' })
    @MinLength(3)
    @MaxLength(96)
  name: string;
  
  @ApiProperty({ description: 'URL-friendly slug', maxLength: 120 })
  @IsString()
  @Length(1, 120)
  slug: string;
 @ApiPropertyOptional({ description: 'Collection image URL' })
  @IsOptional()
  @IsString()
  @Length(0, 500)

  imageUrl?: string;
  @ApiPropertyOptional({ description: 'Collection description' })
  @IsOptional()
  @IsString()
  description?: string;
  @ApiPropertyOptional({ description: 'Collection video URL' })
  @IsOptional()
  @IsString()
   @IsOptional()
  videoUrl?: string;
   @ApiPropertyOptional({ description: 'Collection active status', default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
  @ApiPropertyOptional({ description: 'Product IDs to include in collection' })
  @IsOptional()
  @IsString({ each: true })
  productIds?: string[];

  
}
