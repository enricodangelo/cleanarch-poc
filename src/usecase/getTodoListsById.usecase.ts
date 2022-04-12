import { Inject, Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { TodoList } from '../domain/model/TodoList';
import { TodoListId } from '../domain/model/TodoListId';
import { ITodoListRepository, TODOLIST_REPOSITORY_TOKEN } from '../domain/repository/todoList.repository.interface';
import { IUsecase } from './usecase.interface';

@Injectable()
export class GetTodoListsByIdUsecase implements IUsecase<TodoList | undefined> {
    constructor(@Inject(TODOLIST_REPOSITORY_TOKEN) private readonly todoListRepository: ITodoListRepository<QueryRunner>) {}

    async execute(todoListId: TodoListId): Promise<TodoList | undefined> {
        return await this.todoListRepository.findByPKey(todoListId);
    }
}
