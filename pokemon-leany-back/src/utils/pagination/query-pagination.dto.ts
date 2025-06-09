import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

enum OrderBy {
  ASC = 'asc',
  DESC = 'desc',
}

export class QueryPaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  size?: number;

  @IsOptional()
  @IsString()
  orderBy: string = 'id';

  @IsOptional()
  @IsEnum(OrderBy)
  direction: OrderBy = OrderBy.DESC;

  @IsOptional()
  @IsString()
  search?: string;
}
