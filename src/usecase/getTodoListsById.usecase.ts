import { Inject, Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { AUTHORIZATION_SERVICE_TOKEN, IAuthorizationService } from '../application/authorization.service.interface';
import { TodoList } from '../domain/model/todoList';
import { TodoListId } from '../domain/model/todoListId';
import { UserIdentity } from '../domain/model/userIdentity';
import { ITodoListRepository, TODOLIST_REPOSITORY_TOKEN } from '../domain/repository/todoList.repository.interface';
import { ITransaction } from '../domain/repository/transaction.interface';
import { DB_SERVICE_TOKEN, IDBService } from '../infrastructure/db/db.service.interface';
import { CleanPocError, CLEANPOC_ERROR } from '../utils/error/CleanPocErrors';
import { IUsecase } from './usecase.interface';

@Injectable()
export class GetTodoListsByIdUsecase implements IUsecase<TodoList | undefined> {
    constructor(
        @Inject(DB_SERVICE_TOKEN) private readonly dbService: IDBService,
        @Inject(TODOLIST_REPOSITORY_TOKEN) private readonly todoListRepository: ITodoListRepository<QueryRunner>,
        @Inject(AUTHORIZATION_SERVICE_TOKEN) private readonly authorizationService: IAuthorizationService,
    ) {}

    async execute(todoListId: TodoListId, userIdentity: UserIdentity): Promise<TodoList | undefined> {
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
            return list;
        } catch (err) {
            transaction.rollback();
            throw err;
        }
    }
}
