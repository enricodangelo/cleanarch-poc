import { Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { TodoListEntity } from './todoList.entity';

@Entity()
export class OwnerEntity {
    @PrimaryColumn('uuid')
    userId: string;

    @PrimaryColumn('uuid')
    todoListId: string;

    @OneToOne(() => TodoListEntity, (todoListEntity) => todoListEntity.ownerRelationship)
    todoList: TodoListEntity;
}
