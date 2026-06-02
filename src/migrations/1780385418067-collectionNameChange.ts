import { MigrationInterface, QueryRunner } from 'typeorm';

export class CollectionNameChange1780385418067 implements MigrationInterface {
  name = 'CollectionNameChange1780385418067';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "collections" RENAME COLUMN "name" TO "title"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "collections" RENAME COLUMN "title" TO "name"`);
  }
}
