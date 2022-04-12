import { QueryBuilder, QueryRunner, Repository } from 'typeorm';
import { ITransaction } from '../../../domain/repository/transaction.interface';

export abstract class BaseRepository {
    protected getQueryBuilder<T>(repository: Repository<T>, alias: string, transaction?: ITransaction<QueryRunner>): QueryBuilder<T> {
        return repository.createQueryBuilder(alias, transaction?.context);
    }
}
