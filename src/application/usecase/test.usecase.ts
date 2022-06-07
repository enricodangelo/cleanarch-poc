import { Inject, Injectable, Logger } from '@nestjs/common';
import { IUsecase } from './usecase.interface';
import { v4 as uuidV4 } from 'uuid';
import { inspect } from 'util';
import { DB_SERVICE_INTERFACE, IDBService } from '../db.service.interface';
import { ITodoListRepository, TODOLIST_REPOSITORY_INTERFACE } from '../repository/todoList.repository.interface';
import { ITransaction } from '../repository/transaction.interface';
import { StoredTodoList, TodoList } from '../../domain/model/todoList';
import { OwnerId } from '../../domain/model/ownerId';

@Injectable()
export class TestUsecase implements IUsecase<void> {
    private readonly logger = new Logger(TestUsecase.name);

    constructor(
        @Inject(DB_SERVICE_INTERFACE) private readonly dbService: IDBService,
        @Inject(TODOLIST_REPOSITORY_INTERFACE) private readonly todoListRepository: ITodoListRepository,
    ) {}

    async execute(): Promise<void> {
        this.logger.log(`Starting TestUsecase`);

        const transaction1: ITransaction = this.dbService.newTransaction();

        await transaction1.start();

        this.logger.log(`transaction1: ${inspect(transaction1, { showHidden: true, depth: 2 })}`);

        const todoList: StoredTodoList = await this.todoListRepository.save(TodoList.createNewTodoList('todolist1', new OwnerId(uuidV4())), transaction1);
        this.logger.log(`>>> todoList: ${JSON.stringify(todoList)}`);
        const retrievedTodoListInTransaction: StoredTodoList | undefined = await this.todoListRepository.findByPKey(todoList.id);

        this.logger.log(`retrievedTodoListInTransaction: ${JSON.stringify(retrievedTodoListInTransaction)} >> should be defined`);

        transaction1.rollback();

        const retrievedTodoListOutsideTransaction: StoredTodoList | undefined = await this.todoListRepository.findByPKey(todoList.id);

        this.logger.log(`retrievedTodoListOutsideTransaction: ${JSON.stringify(retrievedTodoListOutsideTransaction)} >> should be undefined`);
    }
}
