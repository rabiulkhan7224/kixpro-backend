import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1776751482763 implements MigrationInterface {
  name = ' $npmConfigName1776751482763';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_9a6f051e66982b5f0318981bcaa"`);
    await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "FK_1fe69e256dfd757e9e7651c6bf5"`);
    await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "FK_841fb46141a9678c044936524d4"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP CONSTRAINT "FK_6343513e20e2deab45edfce1316"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_77d4cad977bd471fb670059561"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_88cea2dc9c31951d06437879b4"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_420d9f679d41281f282f5bc7d0"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_772cae08fc2c6c0b7a87b97bac"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_637a0dd7f9068a9ca80decee00"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_61fac54950763ae56ee51f17fd"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_1846199852a695713b1f8f5e9a"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_464f927ae360106b783ed0b410"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_bdb3c5c1b65c23396e6d52ee02"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_f1d5c12c20d53a3f9ef42f1e13"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_99d0d14f9f23b45d2c6648c4b5"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_0a8c778740127a7bd29470fb89"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_6343513e20e2deab45edfce131"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_46f236f21640f9da218a063a86"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP CONSTRAINT "CHK_ffbfb366ba4b77ed7e8b9bd9b8"`);
    await queryRunner.query(
      `CREATE TABLE "inventory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "variant_id" uuid NOT NULL, "quantity" integer NOT NULL DEFAULT '0', "lowStockThreshold" integer, "allowBackorder" boolean NOT NULL DEFAULT false, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_ceba910e3505fc54c3c7f92c94" UNIQUE ("variant_id"), CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_ceba910e3505fc54c3c7f92c94" ON "inventory" ("variant_id") `);
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "image"`);
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "bannerImage"`);
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "isActive"`);
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "sortOrder"`);
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "metaTitle"`);
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "metaDescription"`);
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "parent_id"`);
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "mpath"`);
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "parentId"`);
    await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "mimeType"`);
    await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "isPrimary"`);
    await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "altText"`);
    await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "width"`);
    await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "height"`);
    await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "product_id"`);
    await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "variant_id"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."products_status_enum"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "metaTitle"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "metaDescription"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "type"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "options"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "requiresShipping"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "isGiftCard"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "tags"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "customFields"`);
    await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "videoUrl"`);
    await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "image"`);
    await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "bannerImage"`);
    await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "type"`);
    await queryRunner.query(`DROP TYPE "public"."collections_type_enum"`);
    await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "conditions"`);
    await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "isAutomated"`);
    await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "isActive"`);
    await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "sortOrder"`);
    await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "metaTitle"`);
    await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "metaDescription"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "compareAtPrice"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "costPerItem"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "size"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "color"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "material"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "style"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "weight"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "weightUnit"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "currency"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "barcode"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "taxable"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "optionValues"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "product_id"`);
    await queryRunner.query(`ALTER TABLE "categories" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "categories" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "media" ADD "productId" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "media" ADD "variantId" uuid`);
    await queryRunner.query(`ALTER TABLE "media" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "media" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "compareAtPrice" numeric(12,2)`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "costPerItem" numeric(10,3)`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "size" character varying(50)`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "color" character varying(50)`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "material" character varying(100)`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "style" character varying(100)`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "weight" numeric(8,3)`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "weightUnit" character varying(20)`);
    await queryRunner.query(
      `ALTER TABLE "product_variants" ADD "currency" character varying(10) NOT NULL DEFAULT 'USD'`,
    );
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "barcode" character varying(20)`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "taxable" boolean NOT NULL DEFAULT true`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "optionValues" jsonb`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "product_id" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "products" ADD "categoryId" uuid`);
    await queryRunner.query(`ALTER TABLE "products" ADD "collectionId" uuid`);
    await queryRunner.query(`ALTER TABLE "products" ADD "mediaId" character varying`);
    await queryRunner.query(`ALTER TABLE "products" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "products" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "collections" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "collections" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "productId" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "stock" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "attributes" jsonb`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "categories" ADD "name" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "categories" ADD "slug" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "UQ_420d9f679d41281f282f5bc7d09" UNIQUE ("slug")`);
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "categories" ADD "description" character varying`);
    await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "url"`);
    await queryRunner.query(`ALTER TABLE "media" ADD "url" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "type"`);
    await queryRunner.query(`ALTER TABLE "media" ADD "type" character varying(50) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "title"`);
    await queryRunner.query(`ALTER TABLE "products" ADD "title" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "products" ADD "slug" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "UQ_464f927ae360106b783ed0b4106" UNIQUE ("slug")`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "brand"`);
    await queryRunner.query(`ALTER TABLE "products" ADD "brand" character varying`);
    await queryRunner.query(`ALTER TABLE "collections" DROP CONSTRAINT "PK_21c00b1ebbd41ba1354242c5c4e"`);
    await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "collections" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
    await queryRunner.query(
      `ALTER TABLE "collections" ADD CONSTRAINT "PK_21c00b1ebbd41ba1354242c5c4e" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "collections" ADD "name" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "collections" ADD "slug" character varying NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "collections" ADD CONSTRAINT "UQ_99d0d14f9f23b45d2c6648c4b57" UNIQUE ("slug")`,
    );
    await queryRunner.query(`ALTER TABLE "product_variants" DROP CONSTRAINT "UQ_46f236f21640f9da218a063a866"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "sku"`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "sku" character varying NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "product_variants" ADD CONSTRAINT "UQ_46f236f21640f9da218a063a866" UNIQUE ("sku")`,
    );
    await queryRunner.query(`ALTER TABLE "product_variants" ALTER COLUMN "price" TYPE numeric`);
    await queryRunner.query(`CREATE INDEX "IDX_0a8c778740127a7bd29470fb89" ON "product_variants" ("price") `);
    await queryRunner.query(`CREATE INDEX "IDX_6343513e20e2deab45edfce131" ON "product_variants" ("product_id") `);
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_46f236f21640f9da218a063a86" ON "product_variants" ("sku") `);
    await queryRunner.query(
      `ALTER TABLE "product_variants" ADD CONSTRAINT "CHK_ffbfb366ba4b77ed7e8b9bd9b8" CHECK ("price" > 0)`,
    );
    await queryRunner.query(
      `ALTER TABLE "inventory" ADD CONSTRAINT "FK_ceba910e3505fc54c3c7f92c943" FOREIGN KEY ("variant_id") REFERENCES "product_variants"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media" ADD CONSTRAINT "FK_43222947f71eee4febe010e3687" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media" ADD CONSTRAINT "FK_e1ff30e53a7dbcc084e8321639d" FOREIGN KEY ("variantId") REFERENCES "product_variants"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_variants" ADD CONSTRAINT "FK_6343513e20e2deab45edfce1316" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_53823b875c14daa5e9009ee6839" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_variants" ADD CONSTRAINT "FK_f515690c571a03400a9876600b5" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product_variants" DROP CONSTRAINT "FK_f515690c571a03400a9876600b5"`);
    await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_53823b875c14daa5e9009ee6839"`);
    await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP CONSTRAINT "FK_6343513e20e2deab45edfce1316"`);
    await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "FK_e1ff30e53a7dbcc084e8321639d"`);
    await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "FK_43222947f71eee4febe010e3687"`);
    await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_ceba910e3505fc54c3c7f92c943"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP CONSTRAINT "CHK_ffbfb366ba4b77ed7e8b9bd9b8"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_46f236f21640f9da218a063a86"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_6343513e20e2deab45edfce131"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_0a8c778740127a7bd29470fb89"`);
    await queryRunner.query(`ALTER TABLE "product_variants" ALTER COLUMN "price" TYPE numeric(12,2)`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP CONSTRAINT "UQ_46f236f21640f9da218a063a866"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "sku"`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "sku" character varying(100) NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "product_variants" ADD CONSTRAINT "UQ_46f236f21640f9da218a063a866" UNIQUE ("sku")`,
    );
    await queryRunner.query(`ALTER TABLE "collections" DROP CONSTRAINT "UQ_99d0d14f9f23b45d2c6648c4b57"`);
    await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "collections" ADD "slug" character varying(120) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "collections" ADD "name" character varying(100) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "collections" DROP CONSTRAINT "PK_21c00b1ebbd41ba1354242c5c4e"`);
    await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "collections" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "collections" ADD CONSTRAINT "PK_21c00b1ebbd41ba1354242c5c4e" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "brand"`);
    await queryRunner.query(`ALTER TABLE "products" ADD "brand" character varying(100)`);
    await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "UQ_464f927ae360106b783ed0b4106"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "products" ADD "slug" character varying(300) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "title"`);
    await queryRunner.query(`ALTER TABLE "products" ADD "title" character varying(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "type"`);
    await queryRunner.query(`ALTER TABLE "media" ADD "type" character varying(100)`);
    await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "url"`);
    await queryRunner.query(`ALTER TABLE "media" ADD "url" character varying(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "categories" ADD "description" text`);
    await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "UQ_420d9f679d41281f282f5bc7d09"`);
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "categories" ADD "slug" character varying(120) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "categories" ADD "name" character varying(100) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "attributes"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "stock"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "productId"`);
    await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "mediaId"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "collectionId"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "categoryId"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "product_id"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "optionValues"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "taxable"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "barcode"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "currency"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "weightUnit"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "weight"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "style"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "material"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "color"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "size"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "costPerItem"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "compareAtPrice"`);
    await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "variantId"`);
    await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "productId"`);
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "product_id" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "optionValues" jsonb`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "taxable" boolean NOT NULL DEFAULT true`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "barcode" character varying(20)`);
    await queryRunner.query(
      `ALTER TABLE "product_variants" ADD "currency" character varying(10) NOT NULL DEFAULT 'USD'`,
    );
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "weightUnit" character varying(20)`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "weight" numeric(8,3)`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "style" character varying(100)`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "material" character varying(100)`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "color" character varying(50)`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "size" character varying(50)`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "costPerItem" numeric(10,3)`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "compareAtPrice" numeric(12,2)`);
    await queryRunner.query(`ALTER TABLE "collections" ADD "metaDescription" character varying(500)`);
    await queryRunner.query(`ALTER TABLE "collections" ADD "metaTitle" character varying(100)`);
    await queryRunner.query(`ALTER TABLE "collections" ADD "sortOrder" integer NOT NULL DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE "collections" ADD "isActive" boolean NOT NULL DEFAULT true`);
    await queryRunner.query(`ALTER TABLE "collections" ADD "isAutomated" boolean NOT NULL DEFAULT false`);
    await queryRunner.query(`ALTER TABLE "collections" ADD "conditions" jsonb`);
    await queryRunner.query(
      `CREATE TYPE "public"."collections_type_enum" AS ENUM('manual', 'automated', 'seasonal', 'gender', 'sale', 'featured')`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "type" "public"."collections_type_enum" NOT NULL DEFAULT 'manual'`,
    );
    await queryRunner.query(`ALTER TABLE "collections" ADD "bannerImage" character varying(500)`);
    await queryRunner.query(`ALTER TABLE "collections" ADD "image" character varying(500)`);
    await queryRunner.query(`ALTER TABLE "collections" ADD "videoUrl" character varying(96)`);
    await queryRunner.query(`ALTER TABLE "products" ADD "customFields" jsonb`);
    await queryRunner.query(`ALTER TABLE "products" ADD "tags" text array NOT NULL DEFAULT '{}'`);
    await queryRunner.query(`ALTER TABLE "products" ADD "isGiftCard" boolean NOT NULL DEFAULT false`);
    await queryRunner.query(`ALTER TABLE "products" ADD "requiresShipping" boolean NOT NULL DEFAULT true`);
    await queryRunner.query(`ALTER TABLE "products" ADD "options" jsonb`);
    await queryRunner.query(`ALTER TABLE "products" ADD "type" character varying(50)`);
    await queryRunner.query(`ALTER TABLE "products" ADD "metaDescription" character varying(500)`);
    await queryRunner.query(`ALTER TABLE "products" ADD "metaTitle" character varying(255)`);
    await queryRunner.query(`CREATE TYPE "public"."products_status_enum" AS ENUM('draft', 'active', 'archived')`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD "status" "public"."products_status_enum" NOT NULL DEFAULT 'draft'`,
    );
    await queryRunner.query(`ALTER TABLE "media" ADD "variant_id" uuid`);
    await queryRunner.query(`ALTER TABLE "media" ADD "product_id" uuid`);
    await queryRunner.query(`ALTER TABLE "media" ADD "height" integer`);
    await queryRunner.query(`ALTER TABLE "media" ADD "width" integer`);
    await queryRunner.query(`ALTER TABLE "media" ADD "altText" character varying(255)`);
    await queryRunner.query(`ALTER TABLE "media" ADD "isPrimary" boolean NOT NULL DEFAULT false`);
    await queryRunner.query(`ALTER TABLE "media" ADD "mimeType" character varying(100)`);
    await queryRunner.query(`ALTER TABLE "categories" ADD "parentId" uuid`);
    await queryRunner.query(`ALTER TABLE "categories" ADD "mpath" character varying DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE "categories" ADD "parent_id" uuid`);
    await queryRunner.query(`ALTER TABLE "categories" ADD "metaDescription" character varying(500)`);
    await queryRunner.query(`ALTER TABLE "categories" ADD "metaTitle" character varying(100)`);
    await queryRunner.query(`ALTER TABLE "categories" ADD "sortOrder" integer NOT NULL DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE "categories" ADD "isActive" boolean NOT NULL DEFAULT true`);
    await queryRunner.query(`ALTER TABLE "categories" ADD "bannerImage" character varying(500)`);
    await queryRunner.query(`ALTER TABLE "categories" ADD "image" character varying(500)`);
    await queryRunner.query(`DROP INDEX "public"."IDX_ceba910e3505fc54c3c7f92c94"`);
    await queryRunner.query(`DROP TABLE "inventory"`);
    await queryRunner.query(
      `ALTER TABLE "product_variants" ADD CONSTRAINT "CHK_ffbfb366ba4b77ed7e8b9bd9b8" CHECK ((price > (0)::numeric))`,
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_46f236f21640f9da218a063a86" ON "product_variants" ("sku") `);
    await queryRunner.query(`CREATE INDEX "IDX_6343513e20e2deab45edfce131" ON "product_variants" ("product_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_0a8c778740127a7bd29470fb89" ON "product_variants" ("price") `);
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_99d0d14f9f23b45d2c6648c4b5" ON "collections" ("slug") `);
    await queryRunner.query(`CREATE INDEX "IDX_f1d5c12c20d53a3f9ef42f1e13" ON "collections" ("type") `);
    await queryRunner.query(`CREATE INDEX "IDX_bdb3c5c1b65c23396e6d52ee02" ON "collections" ("isActive") `);
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_464f927ae360106b783ed0b410" ON "products" ("slug") `);
    await queryRunner.query(`CREATE INDEX "IDX_1846199852a695713b1f8f5e9a" ON "products" ("status") `);
    await queryRunner.query(`CREATE INDEX "IDX_61fac54950763ae56ee51f17fd" ON "products" ("brand") `);
    await queryRunner.query(`CREATE INDEX "IDX_637a0dd7f9068a9ca80decee00" ON "media" ("type") `);
    await queryRunner.query(`CREATE INDEX "IDX_772cae08fc2c6c0b7a87b97bac" ON "media" ("isPrimary") `);
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_420d9f679d41281f282f5bc7d0" ON "categories" ("slug") `);
    await queryRunner.query(`CREATE INDEX "IDX_88cea2dc9c31951d06437879b4" ON "categories" ("parent_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_77d4cad977bd471fb670059561" ON "categories" ("isActive") `);
    await queryRunner.query(
      `ALTER TABLE "product_variants" ADD CONSTRAINT "FK_6343513e20e2deab45edfce1316" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media" ADD CONSTRAINT "FK_841fb46141a9678c044936524d4" FOREIGN KEY ("variant_id") REFERENCES "product_variants"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media" ADD CONSTRAINT "FK_1fe69e256dfd757e9e7651c6bf5" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD CONSTRAINT "FK_9a6f051e66982b5f0318981bcaa" FOREIGN KEY ("parentId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
