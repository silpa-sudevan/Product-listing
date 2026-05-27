import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  DefaultValuePipe,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { ProductsService } from '../products/products.service';
import { CreateProductDto, CreateReviewDto } from '../products/dto/create-product.dto';
import { UpdateProductDto } from '../products/dto/update-product.dto';

@ApiTags('Admin — Product Management')
@Controller('api/admin/products')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class AdminController {
  constructor(private readonly productsService: ProductsService) {}

  // ─── List all products (admin view) ────────────────────────────────────────

  @Get()
  @ApiOperation({ summary: '[Admin] List all products with pagination' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 20 })
  @ApiResponse({ status: 200, description: 'Paginated product list (all, including inactive)' })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ) {
    return this.productsService.findAll(page, limit);
  }

  // ─── Create ─────────────────────────────────────────────────────────────────

  @Post()
  @ApiOperation({ summary: '[Admin] Create a new product' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @ApiResponse({ status: 409, description: 'Product with same slug/SKU already exists' })
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  // ─── Get single product ──────────────────────────────────────────────────────

  @Get(':id')
  @ApiOperation({ summary: '[Admin] Get product by MongoDB ID' })
  @ApiParam({ name: 'id', description: 'MongoDB ObjectId', example: '664f1a2b3c4d5e6f78901234' })
  @ApiResponse({ status: 200, description: 'Product detail' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  // ─── Update ─────────────────────────────────────────────────────────────────

  @Patch(':id')
  @ApiOperation({ summary: '[Admin] Update product by MongoDB ID' })
  @ApiParam({ name: 'id', description: 'MongoDB ObjectId' })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, description: 'Product updated successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  // ─── Delete ─────────────────────────────────────────────────────────────────

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '[Admin] Delete product by MongoDB ID' })
  @ApiParam({ name: 'id', description: 'MongoDB ObjectId' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  // ─── Add review ─────────────────────────────────────────────────────────────

  @Post(':id/reviews')
  @ApiOperation({ summary: '[Admin] Add a review to a product' })
  @ApiParam({ name: 'id', description: 'MongoDB ObjectId' })
  @ApiBody({ type: CreateReviewDto })
  @ApiResponse({ status: 201, description: 'Review added, rating recalculated' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  addReview(@Param('id') id: string, @Body() reviewDto: CreateReviewDto) {
    return this.productsService.addReview(id, reviewDto);
  }
}
