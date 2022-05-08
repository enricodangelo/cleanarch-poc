import { Inject, Injectable, Logger } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { AUTHORIZATION_SERVICE_INTERFACE, IAuthorizationService } from '../application/authorization.service.interface';
import { TodoList } from '../domain/model/todoList';
import { TodoListId } from '../domain/model/todoListId';
import { UserIdentity } from '../domain/model/userIdentity';
import { ITodoListRepository, TODOLIST_REPOSITORY_INTERFACE } from '../domain/repository/todoList.repository.interface';
import { ITransaction } from '../domain/repository/transaction.interface';
import { DB_SERVICE_INTERFACE, IDBService } from '../infrastructure/db/db.service.interface';
import { CleanPocError, CLEANPOC_ERROR } from '../utils/error/CleanPocErrors';
import { IUsecase } from './usecase.interface';

@Injectable()
export class GetTodoListsByIdUsecase implements IUsecase<TodoList | undefined> {
    private readonly logger = new Logger(GetTodoListsByIdUsecase.name);

    constructor(
        @Inject(DB_SERVICE_INTERFACE) private readonly dbService: IDBService,
        @Inject(TODOLIST_REPOSITORY_INTERFACE) private readonly todoListRepository: ITodoListRepository<QueryRunner>,
        @Inject(AUTHORIZATION_SERVICE_INTERFACE) private readonly authorizationService: IAuthorizationService,
    ) {}

    async execute(todoListId: TodoListId, userIdentity: UserIdentity): Promise<TodoList | undefined> {
        this.logger.log(`Starting CreateNewListUsecase`);
        const transaction: ITransaction<QueryRunner> = this.dbService.newTransaction();

        try {
            transaction.start();
            const list: TodoList | undefined = await this.todoListRepository.findByPKey(todoListId);
            if (!list) {
                throw new CleanPocError(CLEANPOC_ERROR.ENTITY_NOT_FOUND, `There's no Todo List with id "${todoListId}"`);
            }
            // will throw an eception if not the owner
            this.authorizationService.isOwner(list, userIdentity);
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
