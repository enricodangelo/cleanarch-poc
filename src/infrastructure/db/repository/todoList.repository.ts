import { DeleteResult, getRepository, QueryBuilder, QueryRunner, Repository, UpdateResult } from 'typeorm';
import { isStoredTask, StoredTask, Task } from '../../../domain/model/Task';
import { TaskId } from '../../../domain/model/TaskId';
import { isStoredTodoList, StoredTodoList, TodoList } from '../../../domain/model/TodoList';
import { TodoListId } from '../../../domain/model/TodoListId';
import { ITodoListRepository } from '../../../domain/repository/todoList.repository.interface';
import { CleanPocError, CLEANPOC_ERROR } from '../../../utils/error/CleanPocErrors';
import { TaskEntity } from '../entity/task.entity';
import { TodoListEntity } from '../entity/todoList.entity';
import { ITransaction } from '../../../domain/repository/transaction.interface';
import { ITOTodoListRepository } from './toTodoListRepository.interface';
import { ITypeORMTransaction } from '../transaction';

// TODO this will not work, the nestjs module is exporting ITodoListRepository, not ITOTodoListRepository...
export class TodoListRepository implements ITOTodoListRepository {
    private toTodoListRepository: Repository<TodoListEntity>;
    private toTaskRepository: Repository<TaskEntity>;

    constructor() {
        this.toTodoListRepository = getRepository<TodoListEntity>(TodoListEntity);
        this.toTaskRepository = getRepository<TaskEntity>(TaskEntity);
    }
    async save(todoList: TodoList, transaction?: ITypeORMTransaction): Promise<TodoList> {
        const queryBuilder: QueryBuilder<TodoListEntity> = this.toTodoListRepository.createQueryBuilder('todoList', transaction?.queryRunner);

        const entity: TodoListEntity = await this.toTodoListRepository.save(this.todoListModelToEntity(todoList));
        return this.todoListEntityToModel(entity);
    }

    // async save(todoList: TodoList): Promise<TodoList> {
    //     const entity: TodoListEntity = await this.toTodoListRepository.save(this.todoListModelToEntity(todoList));
    //     return this.todoListEntityToModel(entity);
    // }

    async update(todoList: StoredTodoList): Promise<TodoList> {
        const updateResult: UpdateResult = await this.toTodoListRepository.update({ id: todoList.id.value }, this.todoListModelToEntity(todoList));
        const affected: number | null | undefined = updateResult?.affected;
        if (!affected) {
            // todo throw error unknown result, affected was null
            throw new Error('TODO update');
        }
        if (affected > 1) {
            // TODO throw error, more than 1 row with same id
            throw new Error('TODO update');
        } else if (affected === 0) {
            throw new CleanPocError(CLEANPOC_ERROR.ENTITY_NOT_FOUND, `Cannot update TodoList with id "${todoList.id}", entity not found`);
        }
        return (await this.findByPKey(todoList.id)) as TodoList;
    }

    async findByPKey(todoListId: TodoListId): Promise<TodoList | undefined> {
        const entity: TodoListEntity | undefined = await this.toTodoListRepository.findOne({ id: todoListId.value });
        return entity ? this.todoListEntityToModel(entity) : undefined;
    }

    async delete(todoListId: TodoListId): Promise<boolean> {
        const delResult: DeleteResult = await this.toTodoListRepository.delete({ id: todoListId.value });
        const affected: number | null | undefined = delResult?.affected;
        if (affected) {
            if (affected > 1) {
                // TODO throw error, more than 1 row with same id
            }
            return delResult.affected === 1;
        }
        // I assume I deleted the entity if no exception is throwm
        return true;
    }

    public todoListEntityToModel(entity: TodoListEntity): TodoList {
        return new StoredTodoList(
            new TodoListId(entity.id),
            entity.name,
            entity.tasks.map((taskEntity) => {
                return this.taskEntityToModel(taskEntity);
            }),
        );
    }

    public todoListModelToEntity(model: TodoList): TodoListEntity {
        const todoListEntity: TodoListEntity = this.toTodoListRepository.create({
            id: isStoredTodoList(model) ? model.id.value : undefined,
            name: model.name,
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
        return this.toTaskRepository.create({
            id: isStoredTask(model) ? model.id.value : undefined,
            todoList: todoListEntity,
            title: model.title,
            notes: model.notes,
            pos: model.pos,
            status: model.status,
        });
    }
}
