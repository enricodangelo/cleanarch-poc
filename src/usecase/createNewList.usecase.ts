import { Inject, Injectable, Logger } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { TodoList } from '../domain/model/todoList';
import { UserIdentity } from '../domain/model/userIdentity';
import { ITodoListRepository, TODOLIST_REPOSITORY_TOKEN } from '../domain/repository/todoList.repository.interface';
import { ITransaction } from '../domain/repository/transaction.interface';
import { DB_SERVICE_TOKEN, IDBService } from '../infrastructure/db/db.service.interface';
import { IUsecase } from './usecase.interface';

@Injectable()
export class CreateNewListUsecase implements IUsecase<TodoList> {
    private readonly logger = new Logger(CreateNewListUsecase.name);

    constructor(
        @Inject(DB_SERVICE_TOKEN) private readonly dbService: IDBService,
        @Inject(TODOLIST_REPOSITORY_TOKEN) private readonly todoListRepository: ITodoListRepository<QueryRunner>,
    ) {}

    async execute(name: string, userIdentity: UserIdentity): Promise<TodoList> {
        this.logger.log(`Starting CreateNewListUsecase`);
        const transaction: ITransaction<QueryRunner> = this.dbService.newTransaction();

        try {
            transaction.start();
            const list: TodoList = await this.todoListRepository.save(TodoList.createNewTodoList(name, userIdentity), transaction);
            transaction.commit();
            this.logger.log(`Succesfully executed CreateNewListUsecase`);
            return list;
        } catch (err) {
            transaction.rollback();
            this.logger.log(`Error in CreateNewListUsecase`);
            throw err;
        }
    }
}
