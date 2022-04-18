import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OwnerEntity } from './owner.entity';
import { TaskEntity } from './task.entity';

@Entity()
export class TodoListEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => TaskEntity, (taskEntity) => taskEntity.todoList)
    tasks: TaskEntity[];

    @OneToOne(() => OwnerEntity, (ownerRelationship) => ownerRelationship.todoList)
    ownerRelationship: OwnerEntity;

    @Column('text')
    name: string;
}
