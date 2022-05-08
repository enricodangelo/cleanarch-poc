import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { TodoListEntity } from './todoList.entity';

@Entity({ name: 'owner' })
export class OwnerEntity {
    @PrimaryColumn('uuid')
    userId: string;

    @OneToMany(() => TodoListEntity, (todoListEntity) => todoListEntity.owner)
    todoLists: TodoListEntity[];
}
