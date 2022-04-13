import { Column, Entity, OneToOne } from 'typeorm';
import { TodoListEntity } from './todoList.entity';

@Entity()
export class OwnerRelationshipEntity {
    // TODO multicolumn pkey, should add constraint?
    @Column('uuid')
    userId: string;

    @OneToOne(() => TodoListEntity, (todoListEntity) => todoListEntity.ownerRelationship)
    todoList: TodoListEntity;
}
