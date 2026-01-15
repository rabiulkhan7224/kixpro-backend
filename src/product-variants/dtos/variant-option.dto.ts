import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class VariantOptionDto {
  @ApiProperty({ description: 'Option name (e.g., "Size", "Color")', maxLength: 50 })
  @IsString()
  @Length(1, 50)
  name: string;

  @ApiProperty({ description: 'Option value (e.g., "XL", "Red")', maxLength: 50 })
  @IsString()
  @Length(1, 50)
  value: string;
}