import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1776574110587 implements MigrationInterface {
  name = ' $npmConfigName1776574110587';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(96) NOT NULL, "lastName" character varying(96) NOT NULL, "email" character varying(96) NOT NULL, "password" character varying(96) NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "slug" character varying NOT NULL, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_420d9f679d41281f282f5bc7d09" UNIQUE ("slug"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_variants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "productId" uuid NOT NULL, "sku" character varying NOT NULL, "price" numeric NOT NULL, "stock" integer NOT NULL, "attributes" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_46f236f21640f9da218a063a866" UNIQUE ("sku"), CONSTRAINT "PK_281e3f2c55652d6a22c0aa59fd7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "type" character varying(50) NOT NULL, "productId" uuid NOT NULL, "variantId" uuid, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "slug" character varying NOT NULL, "description" text, "categoryId" uuid, "collectionId" uuid, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_464f927ae360106b783ed0b4106" UNIQUE ("slug"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "collections" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "slug" character varying NOT NULL, "description" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_99d0d14f9f23b45d2c6648c4b57" UNIQUE ("slug"), CONSTRAINT "PK_21c00b1ebbd41ba1354242c5c4e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "productId"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "stock"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "attributes"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "productId" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "stock" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "attributes" jsonb`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
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
    await queryRunner.query(`ALTER TABLE "product_variants" DROP CONSTRAINT "UQ_46f236f21640f9da218a063a866"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "sku"`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "sku" character varying(100) NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "product_variants" ADD CONSTRAINT "UQ_46f236f21640f9da218a063a866" UNIQUE ("sku")`,
    );
    await queryRunner.query(`ALTER TABLE "product_variants" ALTER COLUMN "price" TYPE numeric(12,2)`);
    await queryRunner.query(`CREATE INDEX "IDX_0a8c778740127a7bd29470fb89" ON "product_variants" ("price") `);
    await queryRunner.query(`CREATE INDEX "IDX_6343513e20e2deab45edfce131" ON "product_variants" ("product_id") `);
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_46f236f21640f9da218a063a86" ON "product_variants" ("sku") `);
    await queryRunner.query(
      `ALTER TABLE "product_variants" ADD CONSTRAINT "CHK_ffbfb366ba4b77ed7e8b9bd9b8" CHECK ("price" > 0)`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_variants" ADD CONSTRAINT "FK_f515690c571a03400a9876600b5" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_variants" ADD CONSTRAINT "FK_6343513e20e2deab45edfce1316" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media" ADD CONSTRAINT "FK_43222947f71eee4febe010e3687" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "media" ADD CONSTRAINT "FK_e1ff30e53a7dbcc084e8321639d" FOREIGN KEY ("variantId") REFERENCES "product_variants"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_53823b875c14daa5e9009ee6839" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_53823b875c14daa5e9009ee6839"`);
    await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
    await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "FK_e1ff30e53a7dbcc084e8321639d"`);
    await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "FK_43222947f71eee4febe010e3687"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP CONSTRAINT "FK_6343513e20e2deab45edfce1316"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP CONSTRAINT "FK_f515690c571a03400a9876600b5"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP CONSTRAINT "CHK_ffbfb366ba4b77ed7e8b9bd9b8"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_46f236f21640f9da218a063a86"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_6343513e20e2deab45edfce131"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_0a8c778740127a7bd29470fb89"`);
    await queryRunner.query(`ALTER TABLE "product_variants" ALTER COLUMN "price" TYPE numeric`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP CONSTRAINT "UQ_46f236f21640f9da218a063a866"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "sku"`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "sku" character varying NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "product_variants" ADD CONSTRAINT "UQ_46f236f21640f9da218a063a866" UNIQUE ("sku")`,
    );
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
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "attributes"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "stock"`);
    await queryRunner.query(`ALTER TABLE "product_variants" DROP COLUMN "productId"`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "attributes" jsonb`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "stock" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "product_variants" ADD "productId" uuid NOT NULL`);
    await queryRunner.query(`DROP TABLE "collections"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "media"`);
    await queryRunner.query(`DROP TABLE "product_variants"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
