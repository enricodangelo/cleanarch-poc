import { QueryBuilder, Repository } from 'typeorm';
import { ITransaction } from '../../../domain/repository/transaction.interface';

export abstract class BaseRepository {
    protected getQueryBuilder<T>(repository: Repository<T>, alias: string, transaction?: ITransaction): QueryBuilder<T> {
        return repository.createQueryBuilder(alias, transaction?.context);
    }
}
