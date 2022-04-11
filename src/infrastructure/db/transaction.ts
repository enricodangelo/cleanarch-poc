import { QueryRunner } from 'typeorm';
import { ITransaction } from '../../domain/repository/transaction.interface';

export interface ITypeORMTransaction extends ITransaction {
    queryRunner: QueryRunner;
}

export class Transaction implements ITypeORMTransaction { //ITransaction {
    // TODO business exception if calling method after release (use internal state)
    readonly _queryRunner: QueryRunner;

    constructor(queryRunner: QueryRunner) {
        this._queryRunner = queryRunner;
    }

    async start(): Promise<void> {
        await this.queryRunner.connect();
        await this.queryRunner.startTransaction();
    }

    async commit(): Promise<void> {
        await this.queryRunner.commitTransaction();
    }

    async rollback(): Promise<void> {
        await this.queryRunner.rollbackTransaction();
    }

    // TODO is this method necessary? // called in finally branch
    /*
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            ...
            await queryRunner.commitTransaction();
        }catch (err) {
            await queryRunner.rollbackTransaction();
        }finally {
            await queryRunner.release();
        }
     */
    async release(): Promise<void> {
        await this.queryRunner.release();
    }

    get queryRunner(): QueryRunner {
        return this._queryRunner;
    }
}
