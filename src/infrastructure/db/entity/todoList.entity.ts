import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaskEntity } from './task.entity';

@Entity()
export class TodoListEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => TaskEntity, (taskEntity) => taskEntity.todoList)
    tasks: TaskEntity[];

    @Column('text')
    name: string;
}
