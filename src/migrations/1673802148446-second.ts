import { MigrationInterface, QueryRunner } from "typeorm";

export class second1673802148446 implements MigrationInterface {
    name = 'second1673802148446'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "temporary_report" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "approved" boolean NOT NULL DEFAULT (0),
                "price" integer NOT NULL,
                "make" varchar NOT NULL,
                "model" varchar NOT NULL,
                "year" integer NOT NULL,
                "lat" integer NOT NULL,
                "long" integer NOT NULL,
                "mileage" integer NOT NULL,
                "userId" integer,
                CONSTRAINT "FK_e347c56b008c2057c9887e230aa" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_report"(
                    "id",
                    "approved",
                    "price",
                    "make",
                    "model",
                    "year",
                    "lat",
                    "long",
                    "mileage",
                    "userId"
                )
            SELECT "id",
                "approved",
                "price",
                "make",
                "model",
                "year",
                "lat",
                "long",
                "mileage",
                "userId"
            FROM "report"
        `);
        await queryRunner.query(`
            DROP TABLE "report"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_report"
                RENAME TO "report"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "report"
                RENAME TO "temporary_report"
        `);
        await queryRunner.query(`
            CREATE TABLE "report" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "approved" boolean NOT NULL DEFAULT (0),
                "price" integer NOT NULL,
                "make" varchar NOT NULL,
                "model" varchar NOT NULL,
                "year" integer NOT NULL,
                "lat" integer NOT NULL,
                "long" integer NOT NULL,
                "mileage" integer NOT NULL,
                "test" varchar NOT NULL,
                "userId" integer,
                CONSTRAINT "FK_e347c56b008c2057c9887e230aa" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "report"(
                    "id",
                    "approved",
                    "price",
                    "make",
                    "model",
                    "year",
                    "lat",
                    "long",
                    "mileage",
                    "userId"
                )
            SELECT "id",
                "approved",
                "price",
                "make",
                "model",
                "year",
                "lat",
                "long",
                "mileage",
                "userId"
            FROM "temporary_report"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_report"
        `);
    }

}
