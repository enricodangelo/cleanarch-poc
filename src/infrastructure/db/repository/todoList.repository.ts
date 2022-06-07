import { DeleteResult, InsertResult, QueryBuilder, UpdateResult } from 'typeorm';
import { isStoredTask, StoredTask, Task } from '../../../domain/model/task';
import { TaskId } from '../../../domain/model/taskId';
import { isStoredTodoList, StoredTodoList, TodoList } from '../../../domain/model/todoList';
import { TodoListId } from '../../../domain/model/todoListId';
import { ITodoListRepository } from '../../../application/repository/todoList.repository.interface';
import { CleanPocError, CLEANPOC_ERROR } from '../../../utils/error/CleanPocErrors';
import { TaskEntity } from '../entity/task.entity';
import { TodoListEntity } from '../entity/todoList.entity';
import { ITransaction } from '../../../application/repository/transaction.interface';
import { BaseRepository } from './base.repository';
import { Injectable } from '@nestjs/common';
import { TodoListEntityRepository } from './typeorm/todoListEntity.repository';
import { OwnerEntityRepository } from './typeorm/ownerEntity.repository';
import { TaskEntityRepository } from './typeorm/taskEntity.repository';
import { OwnerId } from '../../../domain/model/ownerId';

@Injectable()
export class TodoListRepository extends BaseRepository implements ITodoListRepository {
    constructor(
        private todoListEntityRepository: TodoListEntityRepository,
        private taskEntityRepository: TaskEntityRepository,
        private ownerEntityRepository: OwnerEntityRepository,
    ) {
        super();
    }

    async save(todoList: TodoList, transaction?: ITransaction): Promise<StoredTodoList> {
        const queryBuilder: QueryBuilder<TodoListEntity> = this.getQueryBuilder(this.todoListEntityRepository, 'todoList', transaction);

        // TODO only to use the variable
        this.ownerEntityRepository.count();

        const entity: TodoListEntity = this.todoListModelToEntity(todoList);
        const insertRes: InsertResult = await queryBuilder.insert().into(TodoListEntity).values(entity).execute();

        entity.id = String(insertRes.identifiers[0]);
        return this.todoListEntityToModel(entity);
    }

    async update(todoList: StoredTodoList, transaction?: ITransaction): Promise<StoredTodoList> {
        const queryBuilder: QueryBuilder<TodoListEntity> = this.getQueryBuilder(this.todoListEntityRepository, 'todoList', transaction);

        const entity: TodoListEntity = this.todoListModelToEntity(todoList);
        const updateResult: UpdateResult = await queryBuilder
            .update()
            .set({ ...entity, id: undefined })
            .where('id = :id', { id: todoList.id.value })
            .execute();
        const affected: number | null | undefined = updateResult?.affected;
        if (!affected) {
            // todo throw error unknown result, affected was null
            throw new Error('TODO update');
        }
        if (affected > 1) {
            throw new CleanPocError(CLEANPOC_ERROR.TOO_MANY_ENTITIES, `Too many TodoList entities updated with id "${todoList.id}"`);
        } else if (affected === 0) {
            throw new CleanPocError(CLEANPOC_ERROR.ENTITY_NOT_FOUND, `Cannot update TodoList with id "${todoList.id}", entity not found`);
        }
        const res: StoredTodoList | undefined = await this.findByPKey(todoList.id);
        if (!res) {
            throw new Error(`This should never happen`);
        }
        return res;
    }

    async findByPKey(todoListId: TodoListId, transaction?: ITransaction): Promise<StoredTodoList | undefined> {
        const queryBuilder: QueryBuilder<TodoListEntity> = this.getQueryBuilder(this.todoListEntityRepository, 'todoList', transaction);

        const res: TodoListEntity[] = await queryBuilder.select().where('id = :id', { id: todoListId.value }).getMany();
        if (res.length > 1) {
            throw new CleanPocError(CLEANPOC_ERROR.TOO_MANY_ENTITIES, `Too many TodoList entities found with id "${todoListId}"`);
        }
        return res.length === 1 ? this.todoListEntityToModel(res[0]) : undefined;
    }

    async delete(todoListId: TodoListId, transaction?: ITransaction): Promise<boolean> {
        const queryBuilder: QueryBuilder<TodoListEntity> = this.getQueryBuilder(this.todoListEntityRepository, 'todoList', transaction);

        const delResult: DeleteResult = await queryBuilder.delete().where('id = :id', { id: todoListId.value }).execute();
        const affected: number | null | undefined = delResult?.affected;
        if (affected && affected > 1) {
            throw new CleanPocError(CLEANPOC_ERROR.TOO_MANY_ENTITIES, `Too many TodoList entities deleted with id "${todoListId}"`);
        }
        return true;
    }

    public todoListEntityToModel(entity: TodoListEntity): StoredTodoList {
        return new StoredTodoList(
            new TodoListId(entity.id),
            entity.name,
            entity.tasks.map((taskEntity) => {
                return this.taskEntityToModel(taskEntity);
            }),
            new OwnerId(entity.owner.userId),
        );
    }

    public todoListModelToEntity(model: TodoList): TodoListEntity {
        const todoListEntity: TodoListEntity = this.todoListEntityRepository.create({
            id: isStoredTodoList(model) ? model.id.value : undefined,
            name: model.name,
            ownerId: model.ownerId.value,
        });
        todoListEntity.tasks = model.tasks.map((taskModel) => {
            return this.taskModelToEntity(taskModel, todoListEntity);
        });
        return todoListEntity;
    }

    public taskEntityToModel(entity: TaskEntity): Task {
        return new StoredTask(new TaskId(entity.id), entity.title, entity.pos, entity.status, entity.notes);
    }

    public taskModelToEntity(model: Task, todoListEntity: TodoListEntity): TaskEntity {
        return this.taskEntityRepository.create({
            id: isStoredTask(model) ? model.id.value : undefined,
            todoList: todoListEntity,
            title: model.title,
            notes: model.notes,
            pos: model.pos,
            status: model.status,
        });
    }
}
