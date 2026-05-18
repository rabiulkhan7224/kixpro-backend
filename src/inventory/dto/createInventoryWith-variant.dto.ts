import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateInventoryWihVariantDto {
  @ApiPropertyOptional({ description: 'ID of the product variant' })
  @IsOptional()
  @IsString()
  variantId?: string;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  quantity?: number = 0;

  @ApiPropertyOptional({ description: 'Low stock threshold for alerts' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  lowStockThreshold?: number;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  allowBackorder?: boolean = false;
}
