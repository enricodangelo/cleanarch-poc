import { ITransaction } from '../../domain/repository/transaction.interface';

export const DB_SERVICE_TOKEN = 'IDBService';

export interface IDBService {
    newTransaction(): ITransaction;
}
