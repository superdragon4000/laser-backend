import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderTable1739126224509 implements MigrationInterface {
    name = 'AddOrderTable1739126224509'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."order_service_type_enum" AS ENUM('laser', '3d_print')`);
        await queryRunner.query(`CREATE TYPE "public"."order_status_enum" AS ENUM('pending', 'in_progress', 'completed', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "order" ("created_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "id" SERIAL NOT NULL, "file_url" character varying NOT NULL, "service_type" "public"."order_service_type_enum" NOT NULL, "status" "public"."order_status_enum" NOT NULL DEFAULT 'pending', "is_paid" boolean NOT NULL DEFAULT false, "userIdId" integer, "assignedToId" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_77a3765d815efc0006ede1f2cff" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_54cc822017a4344e1080605ec8b" FOREIGN KEY ("assignedToId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_54cc822017a4344e1080605ec8b"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_77a3765d815efc0006ede1f2cff"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TYPE "public"."order_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."order_service_type_enum"`);
    }

}
