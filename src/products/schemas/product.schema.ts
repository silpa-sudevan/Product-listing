import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ProductDocument = Product & Document;

@Schema({ _id: false })
export class Review {
  @ApiProperty()
  @Prop({ required: true })
  reviewer: string;

  @ApiProperty()
  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @ApiProperty()
  @Prop({ required: true })
  comment: string;

  @ApiProperty()
  @Prop({ default: Date.now })
  date: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

@Schema({ _id: false })
export class Dimensions {
  @Prop() length: number;
  @Prop() width: number;
  @Prop() height: number;
  @Prop() unit: string;
}

export const DimensionsSchema = SchemaFactory.createForClass(Dimensions);

@Schema({ timestamps: true })
export class Product {
  @ApiProperty({ example: 'iPhone 15 Pro Max 256GB' })
  @Prop({ required: true, trim: true })
  name: string;

  @ApiProperty({ example: 'iphone-15-pro-max-256gb' })
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  slug: string;

  @ApiProperty({ example: 'PRD-001' })
  @Prop({ required: true, unique: true, uppercase: true, trim: true })
  sku: string;

  @ApiProperty({ example: 'The iPhone 15 Pro Max features a titanium design...' })
  @Prop({ required: true })
  description: string;

  @ApiProperty({ example: 'Latest Apple flagship with A17 Pro chip' })
  @Prop()
  shortDescription: string;

  @ApiProperty({ example: 1299.99 })
  @Prop({ required: true, min: 0 })
  price: number;

  @ApiProperty({ example: 1399.99, description: 'Original / compare-at price' })
  @Prop({ min: 0 })
  compareAtPrice: number;

  @ApiProperty({ example: 'Apple' })
  @Prop({ required: true, trim: true })
  brand: string;

  @ApiProperty({ example: 'Smartphones' })
  @Prop({ required: true, trim: true })
  category: string;

  @ApiProperty({ example: ['Electronics', 'Mobile', 'Apple'], isArray: true })
  @Prop([String])
  tags: string[];

  @ApiProperty({
    example: [
      'https://example.com/img/iphone-front.jpg',
      'https://example.com/img/iphone-back.jpg',
    ],
    isArray: true,
  })
  @Prop([String])
  images: string[];

  @ApiProperty({
    example: 'in_stock',
    enum: ['in_stock', 'out_of_stock', 'pre_order'],
  })
  @Prop({ enum: ['in_stock', 'out_of_stock', 'pre_order'], default: 'in_stock' })
  availability: string;

  @ApiProperty({ example: 150 })
  @Prop({ min: 0, default: 0 })
  stockQuantity: number;

  @ApiProperty({ example: 4.7, minimum: 0, maximum: 5 })
  @Prop({ min: 0, max: 5, default: 0 })
  rating: number;

  @ApiProperty({ example: 128 })
  @Prop({ min: 0, default: 0 })
  reviewCount: number;

  @ApiProperty({ type: [Review] })
  @Prop({ type: [ReviewSchema], default: [] })
  reviews: Review[];

  @ApiProperty({
    example: { Storage: '256GB', Color: 'Natural Titanium', 'Chip': 'A17 Pro' },
  })
  @Prop({ type: Map, of: String })
  specifications: Map<string, string>;

  @ApiProperty({ example: 0.221, description: 'Weight in kg' })
  @Prop({ min: 0 })
  weight: number;

  @ApiProperty({
    example: { length: 159.9, width: 76.7, height: 8.25, unit: 'mm' },
  })
  @Prop({ type: DimensionsSchema })
  dimensions: Dimensions;

  @ApiProperty({ example: true })
  @Prop({ default: true })
  isActive: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

// Text index for full-text search
ProductSchema.index({ name: 'text', description: 'text', brand: 'text', tags: 'text' });
// slug and sku indexes are created automatically via unique:true in @Prop()
ProductSchema.index({ category: 1 });
ProductSchema.index({ price: 1 });
