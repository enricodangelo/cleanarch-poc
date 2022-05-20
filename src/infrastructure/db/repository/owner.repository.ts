import { DeleteResult, InsertResult, QueryBuilder } from 'typeorm';
import { CleanPocError, CLEANPOC_ERROR } from '../../../utils/error/CleanPocErrors';
import { ITransaction } from '../../../domain/repository/transaction.interface';
import { BaseRepository } from './base.repository';
import { Injectable } from '@nestjs/common';
import { OwnerEntityRepository } from './typeorm/ownerEntity.repository';
import { Owner } from '../../../domain/model/owner';
import { OwnerEntity } from '../entity/owner.entity';
import { OwnerId } from '../../../domain/model/ownerId';
import { IOwnerRepository } from '../../../domain/repository/owner.repository.interface';

@Injectable()
export class OwnerRepository extends BaseRepository implements IOwnerRepository {
    constructor(private ownerEntityRepository: OwnerEntityRepository) {
        super();
    }

    async save(owner: Owner, transaction?: ITransaction): Promise<Owner> {
        const queryBuilder: QueryBuilder<OwnerEntity> = this.getQueryBuilder(this.ownerEntityRepository, 'owner', transaction);

        const entity: OwnerEntity = this.ownerModelToEntity(owner);
        const insertRes: InsertResult = await queryBuilder.insert().into(OwnerEntity).values(entity).execute();

        entity.userId = String(insertRes.identifiers[0]);
        return this.ownerEntityToModel(entity);
    }

    async findByPKey(ownerId: OwnerId, transaction?: ITransaction): Promise<Owner | undefined> {
        const queryBuilder: QueryBuilder<OwnerEntity> = this.getQueryBuilder(this.ownerEntityRepository, 'owner', transaction);

        const res: OwnerEntity[] = await queryBuilder.select().where('id = :id', { id: ownerId.value }).getMany();
        if (res.length > 1) {
            throw new CleanPocError(CLEANPOC_ERROR.TOO_MANY_ENTITIES, `Too many Owner entities found with id "${ownerId}"`);
        }
        return res.length === 1 ? this.ownerEntityToModel(res[0]) : undefined;
    }

    async delete(ownerId: OwnerId, transaction?: ITransaction): Promise<boolean> {
        const queryBuilder: QueryBuilder<OwnerEntity> = this.getQueryBuilder(this.ownerEntityRepository, 'owner', transaction);

        const delResult: DeleteResult = await queryBuilder.delete().where('id = :id', { id: ownerId.value }).execute();
        const affected: number | null | undefined = delResult?.affected;
        if (affected && affected > 1) {
            throw new CleanPocError(CLEANPOC_ERROR.TOO_MANY_ENTITIES, `Too many Owner entities deleted with id "${ownerId}"`);
        }
        return true;
    }

    public ownerModelToEntity(model: Owner): OwnerEntity {
        return this.ownerEntityRepository.create({
            userId: model.id.value,
        });
    }

    public ownerEntityToModel(entity: OwnerEntity): Owner {
        return new Owner(new OwnerId(entity.userId));
    }
}
