import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { IDBService } from '../../application/db.service.interface';
import { ITransaction } from '../../application/repository/transaction.interface';
import { Transaction } from './transaction';

@Injectable()
export class DBService implements IDBService {
    constructor(private readonly connection: Connection) {}

    newTransaction(): ITransaction {
        return new Transaction(this.connection.createQueryRunner());
    }
}
