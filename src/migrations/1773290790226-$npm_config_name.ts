import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1773290790226 implements MigrationInterface {
    name = ' $npmConfigName1773290790226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(96) NOT NULL, "lastName" character varying(96) NOT NULL, "email" character varying(96) NOT NULL, "password" character varying(96) NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_variants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sku" character varying(100) NOT NULL, "price" numeric(12,2) NOT NULL, "compareAtPrice" numeric(12,2), "costPerItem" numeric(10,3), "size" character varying(50), "color" character varying(50), "material" character varying(100), "style" character varying(100), "weight" numeric(8,3), "weightUnit" character varying(20), "currency" character varying(10) NOT NULL DEFAULT 'USD', "barcode" character varying(20), "taxable" boolean NOT NULL DEFAULT true, "optionValues" jsonb, "product_id" uuid NOT NULL, CONSTRAINT "UQ_46f236f21640f9da218a063a866" UNIQUE ("sku"), CONSTRAINT "CHK_ffbfb366ba4b77ed7e8b9bd9b8" CHECK ("price" > 0), CONSTRAINT "PK_281e3f2c55652d6a22c0aa59fd7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0a8c778740127a7bd29470fb89" ON "product_variants" ("price") `);
        await queryRunner.query(`CREATE INDEX "IDX_6343513e20e2deab45edfce131" ON "product_variants" ("product_id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_46f236f21640f9da218a063a86" ON "product_variants" ("sku") `);
        await queryRunner.query(`CREATE TABLE "media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying(255) NOT NULL, "type" character varying(100), "mimeType" character varying(100), "isPrimary" boolean NOT NULL DEFAULT false, "altText" character varying(255), "width" integer, "height" integer, "product_id" uuid, "variant_id" uuid, CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_772cae08fc2c6c0b7a87b97bac" ON "media" ("isPrimary") `);
        await queryRunner.query(`CREATE INDEX "IDX_637a0dd7f9068a9ca80decee00" ON "media" ("type") `);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "slug" character varying(120) NOT NULL, "description" text, "image" character varying(500), "bannerImage" character varying(500), "isActive" boolean NOT NULL DEFAULT true, "sortOrder" integer NOT NULL DEFAULT '0', "metaTitle" character varying(100), "metaDescription" character varying(500), "parent_id" uuid, "mpath" character varying DEFAULT '', "parentId" uuid, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_77d4cad977bd471fb670059561" ON "categories" ("isActive") `);
        await queryRunner.query(`CREATE INDEX "IDX_88cea2dc9c31951d06437879b4" ON "categories" ("parent_id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_420d9f679d41281f282f5bc7d0" ON "categories" ("slug") `);
        await queryRunner.query(`CREATE TYPE "public"."products_status_enum" AS ENUM('draft', 'active', 'archived')`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "slug" character varying(300) NOT NULL, "description" text, "brand" character varying(100), "status" "public"."products_status_enum" NOT NULL DEFAULT 'draft', "metaTitle" character varying(255), "metaDescription" character varying(500), "type" character varying(50), "options" jsonb, "requiresShipping" boolean NOT NULL DEFAULT true, "isGiftCard" boolean NOT NULL DEFAULT false, "tags" text array NOT NULL DEFAULT '{}', "customFields" jsonb, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_61fac54950763ae56ee51f17fd" ON "products" ("brand") `);
        await queryRunner.query(`CREATE INDEX "IDX_1846199852a695713b1f8f5e9a" ON "products" ("status") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_464f927ae360106b783ed0b410" ON "products" ("slug") `);
        await queryRunner.query(`CREATE TYPE "public"."collections_type_enum" AS ENUM('manual', 'automated', 'seasonal', 'gender', 'sale', 'featured')`);
        await queryRunner.query(`CREATE TABLE "collections" ("id" SERIAL NOT NULL, "videoUrl" character varying(96), "name" character varying(100) NOT NULL, "slug" character varying(120) NOT NULL, "description" text, "image" character varying(500), "bannerImage" character varying(500), "type" "public"."collections_type_enum" NOT NULL DEFAULT 'manual', "conditions" jsonb, "isAutomated" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT true, "sortOrder" integer NOT NULL DEFAULT '0', "metaTitle" character varying(100), "metaDescription" character varying(500), CONSTRAINT "PK_21c00b1ebbd41ba1354242c5c4e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bdb3c5c1b65c23396e6d52ee02" ON "collections" ("isActive") `);
        await queryRunner.query(`CREATE INDEX "IDX_f1d5c12c20d53a3f9ef42f1e13" ON "collections" ("type") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_99d0d14f9f23b45d2c6648c4b5" ON "collections" ("slug") `);
        await queryRunner.query(`CREATE TABLE "product_categories" ("product_id" uuid NOT NULL, "category_id" uuid NOT NULL, CONSTRAINT "PK_54f2e1dbf14cfa770f59f0aac8f" PRIMARY KEY ("product_id", "category_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8748b4a0e8de6d266f2bbc877f" ON "product_categories" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_9148da8f26fc248e77a387e311" ON "product_categories" ("category_id") `);
        await queryRunner.query(`CREATE TABLE "product_collections" ("product_id" uuid NOT NULL, "collection_id" integer NOT NULL, CONSTRAINT "PK_662f5fbef7b3b65daf2c4ce25c0" PRIMARY KEY ("product_id", "collection_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c876fae7420b26100e0767e7ad" ON "product_collections" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_2f6ff219d1b76f164f46f514fc" ON "product_collections" ("collection_id") `);
        await queryRunner.query(`ALTER TABLE "product_variants" ADD CONSTRAINT "FK_6343513e20e2deab45edfce1316" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "media" ADD CONSTRAINT "FK_1fe69e256dfd757e9e7651c6bf5" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "media" ADD CONSTRAINT "FK_841fb46141a9678c044936524d4" FOREIGN KEY ("variant_id") REFERENCES "product_variants"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_9a6f051e66982b5f0318981bcaa" FOREIGN KEY ("parentId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_categories" ADD CONSTRAINT "FK_8748b4a0e8de6d266f2bbc877f6" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_categories" ADD CONSTRAINT "FK_9148da8f26fc248e77a387e3112" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_collections" ADD CONSTRAINT "FK_c876fae7420b26100e0767e7ad1" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_collections" ADD CONSTRAINT "FK_2f6ff219d1b76f164f46f514fcd" FOREIGN KEY ("collection_id") REFERENCES "collections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_collections" DROP CONSTRAINT "FK_2f6ff219d1b76f164f46f514fcd"`);
        await queryRunner.query(`ALTER TABLE "product_collections" DROP CONSTRAINT "FK_c876fae7420b26100e0767e7ad1"`);
        await queryRunner.query(`ALTER TABLE "product_categories" DROP CONSTRAINT "FK_9148da8f26fc248e77a387e3112"`);
        await queryRunner.query(`ALTER TABLE "product_categories" DROP CONSTRAINT "FK_8748b4a0e8de6d266f2bbc877f6"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_9a6f051e66982b5f0318981bcaa"`);
        await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "FK_841fb46141a9678c044936524d4"`);
        await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "FK_1fe69e256dfd757e9e7651c6bf5"`);
        await queryRunner.query(`ALTER TABLE "product_variants" DROP CONSTRAINT "FK_6343513e20e2deab45edfce1316"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2f6ff219d1b76f164f46f514fc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c876fae7420b26100e0767e7ad"`);
        await queryRunner.query(`DROP TABLE "product_collections"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9148da8f26fc248e77a387e311"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8748b4a0e8de6d266f2bbc877f"`);
        await queryRunner.query(`DROP TABLE "product_categories"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_99d0d14f9f23b45d2c6648c4b5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f1d5c12c20d53a3f9ef42f1e13"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bdb3c5c1b65c23396e6d52ee02"`);
        await queryRunner.query(`DROP TABLE "collections"`);
        await queryRunner.query(`DROP TYPE "public"."collections_type_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_464f927ae360106b783ed0b410"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1846199852a695713b1f8f5e9a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_61fac54950763ae56ee51f17fd"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TYPE "public"."products_status_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_420d9f679d41281f282f5bc7d0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_88cea2dc9c31951d06437879b4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_77d4cad977bd471fb670059561"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_637a0dd7f9068a9ca80decee00"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_772cae08fc2c6c0b7a87b97bac"`);
        await queryRunner.query(`DROP TABLE "media"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_46f236f21640f9da218a063a86"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6343513e20e2deab45edfce131"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0a8c778740127a7bd29470fb89"`);
        await queryRunner.query(`DROP TABLE "product_variants"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
