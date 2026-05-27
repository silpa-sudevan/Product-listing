import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsArray,
  IsEnum,
  IsBoolean,
  IsOptional,
  Min,
  Max,
  IsNotEmpty,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReviewDto {
  @ApiProperty({ example: 'Jane Smith' })
  @IsString()
  @IsNotEmpty()
  reviewer: string;

  @ApiProperty({ example: 5, minimum: 1, maximum: 5 })
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ example: 'Excellent product, fast delivery!' })
  @IsString()
  @IsNotEmpty()
  comment: string;
}

export class CreateDimensionsDto {
  @ApiPropertyOptional({ example: 159.9 })
  @IsOptional()
  @IsNumber()
  length?: number;

  @ApiPropertyOptional({ example: 76.7 })
  @IsOptional()
  @IsNumber()
  width?: number;

  @ApiPropertyOptional({ example: 8.25 })
  @IsOptional()
  @IsNumber()
  height?: number;

  @ApiPropertyOptional({ example: 'mm' })
  @IsOptional()
  @IsString()
  unit?: string;
}

export class CreateProductDto {
  @ApiProperty({ example: 'iPhone 15 Pro Max 256GB' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    example: 'iphone-15-pro-max-256gb',
    description: 'URL-friendly slug (auto-generated from name if omitted)',
  })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({ example: 'PRD-001' })
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({ example: 'The iPhone 15 Pro Max features a titanium design...' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({ example: 'Latest Apple flagship with A17 Pro chip' })
  @IsOptional()
  @IsString()
  shortDescription?: string;

  @ApiProperty({ example: 1299.99 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({ example: 1399.99, description: 'Original price for discount display' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  compareAtPrice?: number;

  @ApiProperty({ example: 'Apple' })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ example: 'Smartphones' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiPropertyOptional({ example: ['Electronics', 'Mobile', 'Apple'], isArray: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({
    example: ['https://example.com/img/iphone-front.jpg'],
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiPropertyOptional({
    example: 'in_stock',
    enum: ['in_stock', 'out_of_stock', 'pre_order'],
    default: 'in_stock',
  })
  @IsOptional()
  @IsEnum(['in_stock', 'out_of_stock', 'pre_order'])
  availability?: string;

  @ApiPropertyOptional({ example: 150 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stockQuantity?: number;

  @ApiPropertyOptional({
    example: { Storage: '256GB', Color: 'Natural Titanium' },
    description: 'Key-value pairs for product specifications',
  })
  @IsOptional()
  @IsObject()
  specifications?: Record<string, string>;

  @ApiPropertyOptional({ example: 0.221, description: 'Weight in kg' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  weight?: number;

  @ApiPropertyOptional({
    example: { length: 159.9, width: 76.7, height: 8.25, unit: 'mm' },
  })
  @IsOptional()
  @Type(() => CreateDimensionsDto)
  dimensions?: CreateDimensionsDto;

  @ApiPropertyOptional({ example: true, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
