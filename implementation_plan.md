mplement E-Commerce Modules
The current codebase already contains collections, category, products, product-variants, and medias modules. However, the existing implementation is more complex and uses different relationships (e.g., ManyToMany for categories and collections to products) than specified in the requirements.

This plan details rewriting these core parts to match your specific simplified requirements exactly.

User Review Required
WARNING

Your existing entities (
Product
, 
Collection
, 
Category
, 
ProductVariant
, 
Media
) have many extra columns (e.g., metaTitle, bannerImage, weight, barcode, compareAtPrice) and different relations (ManyToMany instead of ManyToOne). This implementation will overwrite the existing entities to match the simplified structure you requested. If you want to keep the extra fields and only update relations, please let me know. Otherwise, I will proceed with creating exactly what was requested.

Proposed Changes
Database Setup
The app uses TypeORM and connects to PostgreSQL. We will ensure UUID is used for primary keys across all modules instead of incremental integers or default types. We will use class-validator for DTOs and Repository pattern.

Collection Module
Rewriting the Collection module to hold only requested fields and relations.

[MODIFY] 
collection.entity.ts
Change ID to uuid. Keep only name, slug, description. Add createdAt, updatedAt via TypeORM decorators. Add OneToMany relation to 
Product
.

[MODIFY] 
collections.controller.ts
Update CRUD endpoints to use standard routing.

[MODIFY] 
collections.service.ts
Update service to use Repository<Collection> with standard TypeORM methods.

[MODIFY] 
create-collection.dto.ts
Use class-validator for name, slug, description.

Category Module
Rewriting Category for self-relation.

[MODIFY] 
category.entity.ts
Change IDs to uuid. Keep name, slug. Create self-referential relations (ManyToOne for parentCategory, OneToMany for subcategories). Add OneToMany relation to 
Product
.

[MODIFY] 
category.controller.ts
Standard CRUD routes.

[MODIFY] 
category.service.ts
Standard TypeORM functionality.

[MODIFY] 
create-category.dto.ts
Validate name, slug, parentId.

Product Module
Update to have ManyToOne relations to both Category and Collection.

[MODIFY] 
product.entity.ts
Fields: 
id
, title, slug, description. Add ManyToOne linking to 
Category
 and 
Collection
. Add OneToMany linking to 
ProductVariant
 and 
Media
.

[MODIFY] 
products.controller.ts
Standard CRUD routes for products.

[MODIFY] 
products.service.ts
Save product alongside its categoryId and collectionId.

[MODIFY] 
create-product.dto.ts
Validate title, slug, description, categoryId, collectionId.

Product Variant Module
Update to link specifically to 
Product
 via productId.

[MODIFY] 
productVariant.entity.ts
Fields: 
id
, sku, price, stock, attributes (jsonb). Add ManyToOne to 
Product
.

[MODIFY] 
product-variants.controller.ts
CRUD endpoints for variants.

[MODIFY] 
product-variants.service.ts
Database operations for product variants.

[MODIFY] 
CreateVariant.dto.ts
Validation for variant properties.

Media Module
Simplified media entity linked to product.

[MODIFY] 
media.entity.ts
Fields: 
id
, url, type. Add ManyToOne to 
Product
.

[MODIFY] 
medias.controller.ts
CRUD endpoints for media.

[MODIFY] 
medias.service.ts
Standard db operations.

[MODIFY] 
create-media.dto.ts
Validation for media fields.

Verification Plan
Automated Tests
Run npm run build to ensure NestJS compiles successfully without type errors.
Run database structure check and synchronize via TypeORM (e.g. npm run typeorm schema:sync).
Manual Verification
I will provide curl commands or use wget to test basic endpoints to ensure the server starts correctly and the endpoints are mapped according to standard NestJS routing architecture.