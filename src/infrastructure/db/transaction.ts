import { QueryRunner } from 'typeorm';
import { ITransaction } from '../../application/repository/transaction.interface';
import { v4 as uuidV4 } from 'uuid';
import { Logger } from '@nestjs/common';

export class Transaction implements ITransaction {
    private readonly logger = new Logger(Transaction.name);

    // TODO business exception if calling method after release (use internal state)
    readonly queryRunner: QueryRunner;
    // readonly id: string;

    constructor(queryRunner: QueryRunner) {
        this.queryRunner = queryRunner;
        // this.id = uuidV4();
        this.queryRunner.data['id'] = uuidV4();
    }

    get id(): string {
        return this.queryRunner.data['id'];
    }

    async start(): Promise<void> {
        this.logger.debug(`START transaction ${this.queryRunner.data['id']}`);
        await this.queryRunner.connect();
        await this.queryRunner.startTransaction();
    }

    async commit(): Promise<void> {
        this.logger.debug(`COMMIT transaction ${this.queryRunner.data['id']}`);
        await this.queryRunner.commitTransaction();
        // TODO do I need this or am I closing the default connection to the db?
        await this.queryRunner.release();
    }

    async rollback(): Promise<void> {
        this.logger.debug(`ROLLBACK transaction ${this.queryRunner.data['id']}`);
        await this.queryRunner.rollbackTransaction();
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
