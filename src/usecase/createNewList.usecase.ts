import { Inject, Injectable, Logger } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { OwnerId } from '../domain/model/ownerId';
import { TodoList } from '../domain/model/todoList';
import { UserIdentity } from '../domain/model/userIdentity';
import { ITodoListRepository, TODOLIST_REPOSITORY_INTERFACE } from '../domain/repository/todoList.repository.interface';
import { ITransaction } from '../domain/repository/transaction.interface';
import { DB_SERVICE_INTERFACE, IDBService } from '../infrastructure/db/db.service.interface';
import { IUsecase } from './usecase.interface';

@Injectable()
export class CreateNewListUsecase implements IUsecase<TodoList> {
    private readonly logger = new Logger(CreateNewListUsecase.name);

    constructor(
        @Inject(DB_SERVICE_INTERFACE) private readonly dbService: IDBService,
        @Inject(TODOLIST_REPOSITORY_INTERFACE) private readonly todoListRepository: ITodoListRepository<QueryRunner>,
    ) {}

    async execute(name: string, userIdentity: UserIdentity): Promise<TodoList> {
        this.logger.log(`Starting CreateNewListUsecase`);
        const transaction: ITransaction<QueryRunner> = this.dbService.newTransaction();

        try {
            transaction.start();
            const ownerId: OwnerId = new OwnerId(userIdentity.subject);
            const list: TodoList = await this.todoListRepository.save(TodoList.createNewTodoList(name, ownerId), transaction);
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
