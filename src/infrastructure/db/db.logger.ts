import { Logger as TypeOrmLogger, QueryRunner } from 'typeorm';
import { Logger as NestLogger } from '@nestjs/common';

export class DatabaseLogger implements TypeOrmLogger {
    private readonly logger = new NestLogger(DatabaseLogger.name);

    private getTransactionId(queryRunner?: QueryRunner): string {
        return queryRunner?.data?.['id'] || 'none';
    }

    logQuery(query: string, parameters?: unknown[], queryRunner?: QueryRunner) {
        this.logger.debug(`${query} -- Parameters: ${this.stringifyParameters(parameters)} -- Transaction: ${this.getTransactionId(queryRunner)}`);
    }

    logQueryError(error: string, query: string, parameters?: unknown[], queryRunner?: QueryRunner) {
        this.logger.error(`${query} -- Parameters: ${this.stringifyParameters(parameters)} -- Transaction: ${this.getTransactionId(queryRunner)} -- ${error}`);
    }

    logQuerySlow(time: number, query: string, parameters?: unknown[], queryRunner?: QueryRunner) {
        this.logger.warn(
            `Time: ${time} -- Parameters: ${this.stringifyParameters(parameters)} -- Transaction: ${this.getTransactionId(queryRunner)} -- ${query}`,
        );
    }

    logMigration(message: string, queryRunner?: QueryRunner) {
        this.logger.log(`${message} -- Transaction: ${this.getTransactionId(queryRunner)}`);
    }

    logSchemaBuild(message: string, queryRunner?: QueryRunner) {
        this.logger.log(`${message} -- Transaction: ${this.getTransactionId(queryRunner)}`);
    }

    log(level: 'log' | 'info' | 'warn', message: string, queryRunner?: QueryRunner) {
        if (level === 'log') {
            return this.logger.log(`${message} -- Transaction: ${this.getTransactionId(queryRunner)}`);
        }
        if (level === 'info') {
            return this.logger.debug(`${message} -- Transaction: ${this.getTransactionId(queryRunner)}`);
        }
        if (level === 'warn') {
            return this.logger.warn(`${message} -- Transaction: ${this.getTransactionId(queryRunner)}`);
        }
    }

    private stringifyParameters(parameters?: unknown[]) {
        try {
            return JSON.stringify(parameters);
        } catch {
            return '';
        }
    }
}
