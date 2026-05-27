#  Product Listing 

A full-stack product listing application built with **NestJS**, **MongoDB**, and vanilla HTML/CSS/JS. Features a public storefront, product detail pages, an admin panel, and a fully documented REST API.

---

##  Features

-  Full-text product search with filters (category, brand, price, availability)
-  Product detail page with images, specs, and reviews
-  Admin panel — create, edit, and delete products
-  MongoDB with Mongoose for data storage
-  Swagger / OpenAPI docs at `/api/docs` (eg: `http://localhost:3000/api/docs`)
-  Database seed script for sample data

---

##  Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Backend   | NestJS (Node.js + TypeScript)     |
| Database  | MongoDB + Mongoose                |
| Frontend  | Vanilla HTML / CSS / JavaScript   |
| API Docs  | Swagger (OpenAPI 3.0)             |

---

##  Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/silpa-sudevan/Product-listing.git
cd Product-listing
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
Create a `.env` file in the root:
```env
MONGODB_URI=mongodb://localhost:27017/productlisting
PORT=3000
```

### 4. Seed the database (optional)
```bash
npm run seed
```

### 5. Start the server
```bash
# Development (watch mode)
npm run start:dev

# Production
npm run start:prod
```

---

##  Pages

| URL            | Description              |
|----------------|--------------------------|
| `/`            | Product listing & search |
| `/product.html?slug=<slug>` | Product detail page |
| `/admin.html`  | Admin panel              |
| `/api/docs`    | Swagger API documentation |

---

##  API Endpoints

### Public

| Method | Endpoint                    | Description                          |
|--------|-----------------------------|--------------------------------------|
| GET    | `/api/products`             | Search & list products (paginated)   |
| GET    | `/api/products/categories`  | All distinct categories              |
| GET    | `/api/products/brands`      | All distinct brands                  |
| GET    | `/api/products/:identifier` | Product detail by slug, SKU, or ID   |

### Admin

| Method | Endpoint                          | Description              |
|--------|-----------------------------------|--------------------------|
| GET    | `/api/admin/products`             | List all products        |
| POST   | `/api/admin/products`             | Create a product         |
| PUT    | `/api/admin/products/:id`         | Update a product         |
| DELETE | `/api/admin/products/:id`         | Delete a product         |
| POST   | `/api/admin/products/:id/reviews` | Add a review             |

> Full interactive docs: **[http://localhost:3000/api/docs](http://localhost:3000/api/docs)**

---

##  Project Structure

```
src/
├── main.ts                  # App entry point
├── app.module.ts            # Root module
├── products/                # Public product API
│   ├── products.controller.ts
│   ├── products.service.ts
│   ├── dto/
│   └── schemas/
├── admin/                   # Admin CRUD API
│   ├── admin.controller.ts
│   └── admin.module.ts
└── seeds/                   # Database seeder
    └── seed.ts
public/
├── index.html               # Storefront
├── product.html             # Product detail
└── admin.html               # Admin panel
```

---

##  Scripts

```bash
npm run start:dev     # Start in watch mode

```



