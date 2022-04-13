import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OwnerRelationshipEntity } from './ownerRelationship.entity';
import { TaskEntity } from './task.entity';

@Entity()
export class TodoListEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => TaskEntity, (taskEntity) => taskEntity.todoList)
    tasks: TaskEntity[];

    @OneToOne(() => OwnerRelationshipEntity, (ownerRelationship) => ownerRelationship.todoList)
    ownerRelationship: OwnerRelationshipEntity;

    @Column('text')
    name: string;
}
