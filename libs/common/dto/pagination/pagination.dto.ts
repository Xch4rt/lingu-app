import { IsInt, IsPositive, IsOptional, IsString, IsNumber } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  perPage?: number = 10;

  @IsOptional()
  @IsString()
  search?: string;
}