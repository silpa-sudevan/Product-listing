import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto, CreateReviewDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchProductDto } from './dto/search-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  private buildSortQuery(sort?: string): Record<string, 1 | -1> {
    const sortMap: Record<string, Record<string, 1 | -1>> = {
      price_asc: { price: 1 },
      price_desc: { price: -1 },
      name_asc: { name: 1 },
      name_desc: { name: -1 },
      rating_desc: { rating: -1 },
      newest: { createdAt: -1 },
    };
    return sortMap[sort ?? ''] ?? { createdAt: -1 };
  }

  // ─── Public: Search ───────────────────────────────────────────────────────────

  async search(dto: SearchProductDto) {
    const { q, page = 1, limit = 10, category, brand, minPrice, maxPrice, availability, sort } = dto;
    const safeLimit = Math.min(limit, 100);
    const skip = (page - 1) * safeLimit;

    const filter: Record<string, unknown> = { isActive: true };

    if (q) {
      filter.$text = { $search: q };
    }
    if (category) filter.category = { $regex: category, $options: 'i' };
    if (brand) filter.brand = { $regex: brand, $options: 'i' };
    if (availability) filter.availability = availability;
    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};
      if (minPrice !== undefined) (filter.price as Record<string, number>).$gte = minPrice;
      if (maxPrice !== undefined) (filter.price as Record<string, number>).$lte = maxPrice;
    }

    const sortQuery = this.buildSortQuery(sort);

    const [products, total] = await Promise.all([
      this.productModel.find(filter).sort(sortQuery).skip(skip).limit(safeLimit).lean(),
      this.productModel.countDocuments(filter),
    ]);

    return {
      data: products,
      meta: {
        total,
        page,
        limit: safeLimit,
        totalPages: Math.ceil(total / safeLimit),
        hasNextPage: page < Math.ceil(total / safeLimit),
        hasPrevPage: page > 1,
      },
    };
  }

  // ─── Public: Find by slug or id ───────────────────────────────────────────────

  async findBySlugOrId(identifier: string): Promise<ProductDocument> {
    let product: ProductDocument | null = null;

    // Try as MongoDB ObjectId first
    if (/^[a-f\d]{24}$/i.test(identifier)) {
      product = await this.productModel.findById(identifier).lean() as unknown as ProductDocument;
    }

    // Try slug
    if (!product) {
      product = await this.productModel.findOne({ slug: identifier.toLowerCase() }).lean() as unknown as ProductDocument;
    }

    // Try SKU
    if (!product) {
      product = await this.productModel.findOne({ sku: identifier.toUpperCase() }).lean() as unknown as ProductDocument;
    }

    if (!product) {
      throw new NotFoundException(`Product "${identifier}" not found`);
    }
    return product;
  }

  // ─── Admin: CRUD ──────────────────────────────────────────────────────────────

  async create(dto: CreateProductDto): Promise<ProductDocument> {
    const slug = dto.slug ?? this.generateSlug(dto.name);

    const existing = await this.productModel.findOne({
      $or: [{ slug }, { sku: dto.sku.toUpperCase() }],
    });
    if (existing) {
      throw new ConflictException('A product with the same slug or SKU already exists');
    }

    const product = new this.productModel({ ...dto, slug });
    return product.save();
  }

  async findAll(page = 1, limit = 20): Promise<{ data: ProductDocument[]; meta: object }> {
    const safeLimit = Math.min(limit, 100);
    const skip = (page - 1) * safeLimit;

    const [data, total] = await Promise.all([
      this.productModel.find().sort({ createdAt: -1 }).skip(skip).limit(safeLimit).lean(),
      this.productModel.countDocuments(),
    ]);

    return {
      data: data as unknown as ProductDocument[],
      meta: {
        total,
        page,
        limit: safeLimit,
        totalPages: Math.ceil(total / safeLimit),
      },
    };
  }

  async findOne(id: string): Promise<ProductDocument> {
    const product = await this.productModel.findById(id).lean() as unknown as ProductDocument;
    if (!product) throw new NotFoundException(`Product with id "${id}" not found`);
    return product;
  }

  async update(id: string, dto: UpdateProductDto): Promise<ProductDocument> {
    if (dto.name && !dto.slug) {
      dto.slug = this.generateSlug(dto.name);
    }
    const product = await this.productModel
      .findByIdAndUpdate(id, dto, { new: true, runValidators: true })
      .lean() as unknown as ProductDocument;
    if (!product) throw new NotFoundException(`Product with id "${id}" not found`);
    return product;
  }

  async remove(id: string): Promise<{ message: string }> {
    const product = await this.productModel.findByIdAndDelete(id);
    if (!product) throw new NotFoundException(`Product with id "${id}" not found`);
    return { message: `Product "${product.name}" deleted successfully` };
  }

  async addReview(id: string, reviewDto: CreateReviewDto): Promise<ProductDocument> {
    const product = await this.productModel.findById(id);
    if (!product) throw new NotFoundException(`Product with id "${id}" not found`);

    product.reviews.push({ ...reviewDto, date: new Date() });

    // Recalculate average rating
    const total = product.reviews.reduce((sum, r) => sum + r.rating, 0);
    product.rating = Math.round((total / product.reviews.length) * 10) / 10;
    product.reviewCount = product.reviews.length;

    return product.save();
  }

  async getCategories(): Promise<string[]> {
    return this.productModel.distinct('category', { isActive: true });
  }

  async getBrands(): Promise<string[]> {
    return this.productModel.distinct('brand', { isActive: true });
  }
}
