import { MigrationInterface, QueryRunner } from 'typeorm';

export class Dbupdate1782354920698 implements MigrationInterface {
  name = 'Dbupdate1782354920698';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "collections" RENAME COLUMN "title" TO "name"`);
    await queryRunner.query(
      `CREATE TABLE "shipping_addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, "fullName" character varying NOT NULL, "line1" character varying NOT NULL, "line2" character varying, "city" character varying NOT NULL, "state" character varying NOT NULL, "zip" character varying NOT NULL, "country" character varying NOT NULL, "phone" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cced78984eddbbe24470f226692" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."payments_method_enum" AS ENUM('stripe', 'paypal')`);
    await queryRunner.query(
      `CREATE TYPE "public"."payments_status_enum" AS ENUM('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "orderId" uuid NOT NULL, "amount" numeric(12,2) NOT NULL, "currency" character varying NOT NULL DEFAULT 'USD', "method" "public"."payments_method_enum" NOT NULL, "status" "public"."payments_status_enum" NOT NULL DEFAULT 'PENDING', "externalId" character varying, "metadata" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_af929a5f2a400fdb6913b4967e" UNIQUE ("orderId"), CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_af929a5f2a400fdb6913b4967e" ON "payments" ("orderId") `);
    await queryRunner.query(
      `CREATE TYPE "public"."shipments_status_enum" AS ENUM('LABEL_CREATED', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "shipments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "carrier" character varying, "trackingNumber" character varying, "status" "public"."shipments_status_enum" NOT NULL DEFAULT 'LABEL_CREATED', "cratedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6deda4532ac542a93eab214b564" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reviews" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "productId" uuid NOT NULL, "rating" integer NOT NULL, "title" text, "body" text, "status" character varying NOT NULL DEFAULT 'PUBLISHED', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "CHK_63a9418754cc39aac117bf27ed" CHECK (rating >= 1 AND rating <= 5), CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_9007ffba411fd471dfe233dabf" ON "reviews" ("userId", "productId") `,
    );
    await queryRunner.query(`CREATE INDEX "IDX_a6b3c434392f5d10ec17104366" ON "reviews" ("productId") `);
    await queryRunner.query(
      `CREATE TYPE "public"."notifications_type_enum" AS ENUM('ORDER_CONFIRMED', 'ORDER_SHIPPED', 'PROMOTION')`,
    );
    await queryRunner.query(
      `CREATE TABLE "notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "type" "public"."notifications_type_enum" NOT NULL, "title" character varying NOT NULL, "body" text NOT NULL, "metadata" jsonb, "read" boolean NOT NULL DEFAULT false, "readAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_eb224d6d3acf40220d84a63720" ON "notifications" ("userId", "readAt") `);
    await queryRunner.query(`ALTER TABLE "collections" ADD "title" character varying NOT NULL DEFAULT ''`);
    await queryRunner.query(`UPDATE "collections" SET "title" = "name"`);
    await queryRunner.query(`ALTER TABLE "collections" ALTER COLUMN "title" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "shippingAddressId"`);
    await queryRunner.query(`ALTER TABLE "orders" ADD "shippingAddressId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "shipping_addresses" ADD CONSTRAINT "FK_6f522735551c716dc489635b5b7" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ADD CONSTRAINT "FK_af929a5f2a400fdb6913b4967e1" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_cc4e4adab232e8c05026b2f345d" FOREIGN KEY ("shippingAddressId") REFERENCES "shipping_addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "FK_a6b3c434392f5d10ec171043666" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notifications" ADD CONSTRAINT "FK_692a909ee0fa9383e7859f9b406" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_692a909ee0fa9383e7859f9b406"`);
    await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_a6b3c434392f5d10ec171043666"`);
    await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_cc4e4adab232e8c05026b2f345d"`);
    await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_af929a5f2a400fdb6913b4967e1"`);
    await queryRunner.query(`ALTER TABLE "shipping_addresses" DROP CONSTRAINT "FK_6f522735551c716dc489635b5b7"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "shippingAddressId"`);
    await queryRunner.query(`ALTER TABLE "orders" ADD "shippingAddressId" character varying`);
    await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "reviewCount"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "averageRating"`);
    await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "title"`);
    await queryRunner.query(`ALTER TABLE "collections" ADD "name" character varying NOT NULL DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE "collections" ALTER COLUMN "name" DROP DEFAULT`);
    await queryRunner.query(`DROP INDEX "public"."IDX_eb224d6d3acf40220d84a63720"`);
    await queryRunner.query(`DROP TABLE "notifications"`);
    await queryRunner.query(`DROP TYPE "public"."notifications_type_enum"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_a6b3c434392f5d10ec17104366"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_9007ffba411fd471dfe233dabf"`);
    await queryRunner.query(`DROP TABLE "reviews"`);
    await queryRunner.query(`DROP TABLE "shipments"`);
    await queryRunner.query(`DROP TYPE "public"."shipments_status_enum"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_af929a5f2a400fdb6913b4967e"`);
    await queryRunner.query(`DROP TABLE "payments"`);
    await queryRunner.query(`DROP TYPE "public"."payments_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."payments_method_enum"`);
    await queryRunner.query(`DROP TABLE "shipping_addresses"`);
    await queryRunner.query(`ALTER TABLE "collections" RENAME COLUMN "name" TO "title"`);
  }
}
