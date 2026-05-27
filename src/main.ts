import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: false }),
  );

  // CORS
  app.enableCors();

  // Swagger / OpenAPI
  const config = new DocumentBuilder()
    .setTitle('Product Listing API')
    .setDescription(
      `## SuperLabs Backend Task — Product Listing API\n\n` +
      `### Public Endpoints\n` +
      `- **GET /api/products** — Search & list products with full-text search + pagination\n` +
      `- **GET /api/products/categories** — Distinct category list\n` +
      `- **GET /api/products/brands** — Distinct brand list\n` +
      `- **GET /api/products/:identifier** — Product detail by slug, SKU, or MongoDB ID\n\n` +
      `### Admin Endpoints\n` +
      `- **GET /api/admin/products** — List all products\n` +
      `- **POST /api/admin/products** — Create product\n` +
      `- **PUT /api/admin/products/:id** — Update product\n` +
      `- **DELETE /api/admin/products/:id** — Delete product\n` +
      `- **POST /api/admin/products/:id/reviews** — Add review\n\n` +
      `### Frontend\n` +
      `- **/** — Product search & listing page\n` +
      `- **/admin.html** — Admin product management interface`,
    )
    .setVersion('1.0')
    .addTag('Products', 'Public product search and detail APIs')
    .addTag('Admin — Product Management', 'Admin CRUD operations for products')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: { persistAuthorization: true, tagsSorter: 'alpha' },
    customSiteTitle: 'Product Listing API Docs',
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`\n  Application running on: http://localhost:${port}`);
  console.log(` Swagger docs at:        http://localhost:${port}/api/docs`);
  console.log(` Frontend at:            http://localhost:${port}/`);
  console.log(` Admin panel at:         http://localhost:${port}/admin.html \n `);
}
bootstrap();

