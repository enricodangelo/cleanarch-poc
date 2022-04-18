import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TASK_STATUS } from '../../../domain/model/task';
import { TodoListEntity } from './todoList.entity';

@Entity()
export class TaskEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => TodoListEntity, (todoListEntity) => todoListEntity.tasks)
    todoList: TodoListEntity;

    @Column('text')
    title: string;

    @Column('text')
    notes: string;

    @Column('smallint')
    pos: number;

    @Column('enum', { enum: Object.values(TASK_STATUS) })
    status: TASK_STATUS;
}
