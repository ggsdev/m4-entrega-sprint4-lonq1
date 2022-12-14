import { MigrationInterface, QueryRunner } from "typeorm";

export class addDeleteDateColumn1670960060949 implements MigrationInterface {
    name = 'addDeleteDateColumn1670960060949'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`);
    }

}
