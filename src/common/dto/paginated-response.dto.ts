import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetaDto {
  @ApiProperty() total: number;
  @ApiProperty() page: number;
  @ApiProperty() limit: number;
  @ApiProperty() totalPages: number;
}

export function PaginatedResponseDto<T>(ItemType: new () => T): any {
  class PaginatedResponse {
    @ApiProperty({ type: [ItemType] })
    data: T[];

    @ApiProperty({ type: PaginationMetaDto })
    meta: PaginationMetaDto;
  }
  return PaginatedResponse;
}
