import { Inject, Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { TodoList } from '../domain/model/todoList';
import { ITodoListRepository, TODOLIST_REPOSITORY_TOKEN } from '../domain/repository/todoList.repository.interface';
import { ITransaction } from '../domain/repository/transaction.interface';
import { DB_SERVICE_TOKEN, IDBService } from '../infrastructure/db/db.service.interface';
import { IUsecase } from './usecase.interface';

@Injectable()
export class CreateNewListUsecase implements IUsecase<TodoList> {
    constructor(
        @Inject(DB_SERVICE_TOKEN) private readonly dbService: IDBService,
        @Inject(TODOLIST_REPOSITORY_TOKEN) private readonly todoListRepository: ITodoListRepository<QueryRunner>,
    ) {}

    async execute(name: string): Promise<TodoList> {
        const transaction: ITransaction<QueryRunner> = this.dbService.newTransaction();
        return await this.todoListRepository.save(TodoList.createNewTodoList(name), transaction);
    }
}
