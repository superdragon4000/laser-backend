import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMaterialTable1739126299787 implements MigrationInterface {
    name = 'AddMaterialTable1739126299787'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."material_type_enum" AS ENUM('laser', '3d_print')`);
        await queryRunner.query(`CREATE TABLE "material" ("created_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" "public"."material_type_enum" NOT NULL, "price" numeric NOT NULL, "unit_of_measurement" character varying NOT NULL, CONSTRAINT "PK_0343d0d577f3effc2054cbaca7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order" ADD "materialId" integer`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_ee8ed3501384b508bb52aa96e58" FOREIGN KEY ("materialId") REFERENCES "material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_ee8ed3501384b508bb52aa96e58"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "materialId"`);
        await queryRunner.query(`DROP TABLE "material"`);
        await queryRunner.query(`DROP TYPE "public"."material_type_enum"`);
    }

}
