import { QueryBuilder, Repository } from 'typeorm';
import { ITransaction } from '../../../application/repository/transaction.interface';

// TODO add debug logging to show when in transaction and which
export abstract class BaseRepository {
    protected getQueryBuilder<T>(repository: Repository<T>, alias: string, transaction?: ITransaction): QueryBuilder<T> {
        return repository.createQueryBuilder(alias, transaction?.context);
    }
}
