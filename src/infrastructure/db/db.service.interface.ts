import { QueryRunner } from 'typeorm';
import { ITransaction } from '../../domain/repository/transaction.interface';

export const DB_SERVICE_TOKEN = 'IDBService';

// TODO in which layer should this interface be??
export interface IDBService {
    newTransaction(): ITransaction<QueryRunner>;
}
