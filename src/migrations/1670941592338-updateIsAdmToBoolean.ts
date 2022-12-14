import { MigrationInterface, QueryRunner } from "typeorm";

export class updateIsAdmToBoolean1670941592338 implements MigrationInterface {
    name = 'updateIsAdmToBoolean1670941592338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isAdm"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isAdm" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isAdm"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isAdm" character varying NOT NULL`);
    }

}
