import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TASK_STATUS } from '../../../domain/model/Task';
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

    @Column('number')
    pos: number;

    @Column('enum', { enum: Object.values(TASK_STATUS) })
    status: TASK_STATUS;
}
