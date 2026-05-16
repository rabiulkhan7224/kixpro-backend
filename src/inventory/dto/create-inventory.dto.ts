import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, Min } from 'class-validator';

// -- Nested Inventory DTO (re-usable) --
export class CreateInventoryDto {
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
