import { Inject, Injectable, Logger } from '@nestjs/common';
import { IUsecase } from './usecase.interface';
import { v4 as uuidV4 } from 'uuid';
import { DB_SERVICE_INTERFACE, IDBService } from '../db.service.interface';
import { ITodoListRepository, TODOLIST_REPOSITORY_INTERFACE } from '../repository/todoList.repository.interface';
import { ITransaction } from '../repository/transaction.interface';
import { StoredTodoList, TodoList } from '../../domain/model/todoList';
import { OwnerId } from '../../domain/model/ownerId';

@Injectable()
export class Test01Usecase implements IUsecase<void> {
    private readonly logger = new Logger(Test01Usecase.name);

    constructor(
        @Inject(DB_SERVICE_INTERFACE) private readonly dbService: IDBService,
        @Inject(TODOLIST_REPOSITORY_INTERFACE) private readonly todoListRepository: ITodoListRepository,
    ) {}

    async execute(): Promise<void> {
        this.logger.log(`Starting Test01Usecase`);

        const transaction1: ITransaction = this.dbService.newTransaction();

        await transaction1.start();

        const todoList: StoredTodoList = await this.todoListRepository.save(TodoList.createNewTodoList('todolist1', new OwnerId(uuidV4())), transaction1);
        this.logger.log(`todoList: ${JSON.stringify(todoList)}`);

        const inTransaction: StoredTodoList | undefined = await this.todoListRepository.findByPKey(todoList.id, transaction1);
        if (!inTransaction) {
            this.logger.log(`inTransaction: undefined [ERR]`);
            return;
        }
        this.logger.log(`inTransaction: ${JSON.stringify(inTransaction)} [${inTransaction.equals(todoList) ? 'OK' : 'ERR'}]`);

        const outsideTransaction: StoredTodoList | undefined = await this.todoListRepository.findByPKey(todoList.id);
        this.logger.log(`outsideTransaction: ${JSON.stringify(outsideTransaction)} [${!outsideTransaction ? 'OK' : 'ERR'}]`);

        transaction1.rollback();

        const outsideTransactionRolledBack: StoredTodoList | undefined = await this.todoListRepository.findByPKey(todoList.id);
        this.logger.log(`outsideTransactionRolledBack: ${JSON.stringify(outsideTransactionRolledBack)} [${!outsideTransactionRolledBack ? 'OK' : 'ERR'}]`);

        try {
            await this.todoListRepository.findByPKey(todoList.id, transaction1);
        } catch (err) {
            this.logger.log(`Error triggered: ${JSON.stringify(err)}`);
        }
    }
}
