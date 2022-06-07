import { Owner } from '../../domain/model/owner';
import { OwnerId } from '../../domain/model/ownerId';
import { ITransaction } from './transaction.interface';

export const OWNER_REPOSITORY_INTERFACE = 'IOwnerRepository';

export interface IOwnerRepository {
    save(owner: Owner, transaction?: ITransaction): Promise<Owner>;

    findByPKey(ownerId: OwnerId, transaction?: ITransaction): Promise<Owner | undefined>;

    delete(ownerId: OwnerId, transaction?: ITransaction): Promise<boolean>;
}
