import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OwnerEntity } from './owner.entity';
import { TaskEntity } from './task.entity';

@Entity({ name: 'todolist' })
export class TodoListEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => TaskEntity, (taskEntity) => taskEntity.todoList)
    tasks: TaskEntity[];

    @ManyToOne(() => OwnerEntity, (ownerRelationship) => ownerRelationship.todoLists)
    owner: OwnerEntity;

    @Column('uuid')
    ownerId: string;

    @Column('text')
    name: string;
}
