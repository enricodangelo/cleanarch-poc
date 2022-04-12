import { QueryRunner } from 'typeorm';
import { ITransaction } from '../../domain/repository/transaction.interface';

export class Transaction implements ITransaction<QueryRunner> {
    // TODO business exception if calling method after release (use internal state)
    readonly queryRunner: QueryRunner;

    constructor(queryRunner: QueryRunner) {
        this.queryRunner = queryRunner;
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
    async close(): Promise<void> {
        await this.queryRunner.release();
    }

    get context(): QueryRunner {
        return this.queryRunner;
    }

    get isActive(): boolean {
        return this.queryRunner.isTransactionActive;
    }

    get isClosed(): boolean {
        return this.queryRunner.isReleased;
    }
}
