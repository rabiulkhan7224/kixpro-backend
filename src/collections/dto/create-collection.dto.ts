import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCollectionDto {
   @IsString()
    @IsNotEmpty({ message: 'title cannot be empty.' })
    @MinLength(3)
    @MaxLength(96)
  title: string;
  @IsString()
   @IsOptional()
  imageUrl?: string;
   @IsString()
    @IsNotEmpty({ message: 'title cannot be empty.' })
    @MinLength(3)
    @MaxLength(96)
  description: string;
  @IsString()
   @IsOptional()
  videoUrl?: string;
  
}
