import { Injectable } from '@nestjs/common';
import { Connection, QueryRunner } from 'typeorm';
import { IDBService } from './db.service.interface';
import { ITransaction } from '../../domain/repository/transaction.interface';
import { Transaction } from './transaction';

@Injectable()
export class DBService implements IDBService {
    constructor(private connection: Connection) {}

    newTransaction(): ITransaction<QueryRunner> {
        return new Transaction(this.connection.createQueryRunner());
    }
}
