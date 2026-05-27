import {
  Controller,
  Get,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { SearchProductDto } from './dto/search-product.dto';

@ApiTags('Products')
@Controller('api/products')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()

  @ApiQuery({ name: 'q', required: false, example: 'iphone', description: 'Search keyword' })
  // @ApiQuery({ name: 'page', required: false, example: 1 })
  // @ApiQuery({ name: 'limit', required: false, example: 10 })
  // @ApiQuery({ name: 'category', required: false, example: 'Smartphones' })
  // @ApiQuery({ name: 'brand', required: false, example: 'Apple' })
  // @ApiQuery({ name: 'minPrice', required: false, example: 100 })
  // @ApiQuery({ name: 'maxPrice', required: false, example: 2000 })
  @ApiQuery({
    name: 'availability',
    required: false,
    enum: ['in_stock', 'out_of_stock', 'pre_order'],
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    enum: ['price_asc', 'price_desc', 'name_asc', 'name_desc', 'rating_desc', 'newest'],
  })
  @ApiResponse({ status: 200, description: 'Paginated product list' })
  search(@Query() query: SearchProductDto) {
    return this.productsService.search(query);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get all distinct product categories' })
  @ApiResponse({ status: 200, description: 'List of categories' })
  getCategories() {
    return this.productsService.getCategories();
  }

  @Get('brands')
  @ApiOperation({ summary: 'Get all distinct product brands' })
  @ApiResponse({ status: 200, description: 'List of brands' })
  getBrands() {
    return this.productsService.getBrands();
  }

  @Get(':identifier')
  @ApiOperation({
    summary: 'Get product by slug, SKU, or MongoDB ID',
    description: 'The :identifier can be a URL slug (e.g. iphone-15-pro), a SKU (e.g. PRD-001), or a MongoDB ObjectId.',
  })
  @ApiParam({
    name: 'identifier',
    description: 'Product slug, SKU, or MongoDB ObjectId',
    example: 'iphone-15-pro-max-256gb',
  })
  @ApiResponse({ status: 200, description: 'Product detail' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  findOne(@Param('identifier') identifier: string) {
    return this.productsService.findBySlugOrId(identifier);
  }
}
