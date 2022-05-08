import { Owner } from '../model/owner';
import { OwnerId } from '../model/ownerId';
import { ITransaction } from './transaction.interface';

export const OWNER_REPOSITORY_INTERFACE = 'IOwnerRepository';

export interface IOwnerRepository<T> {
    save(owner: Owner, transaction?: ITransaction<T>): Promise<Owner>;

    findByPKey(ownerId: OwnerId, transaction?: ITransaction<T>): Promise<Owner | undefined>;

    delete(ownerId: OwnerId, transaction?: ITransaction<T>): Promise<boolean>;
}
