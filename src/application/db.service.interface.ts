import { ITransaction } from './repository/transaction.interface';

export const DB_SERVICE_INTERFACE = 'IDBService';

export interface IDBService {
    newTransaction(): ITransaction;
}
