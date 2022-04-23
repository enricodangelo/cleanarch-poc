import { EntityRepository, Repository } from 'typeorm';
import { OwnerEntity } from '../../entity/owner.entity';

@EntityRepository(OwnerEntity)
export class OwnerEntityRepository extends Repository<OwnerEntity> {}
