import { Test } from '@nestjs/testing';
import { OwnerId } from '../../src/domain/model/ownerId';
import { StoredTodoList, TodoList } from '../../src/domain/model/todoList';
import { ITodoListRepository } from '../../src/application/repository/todoList.repository.interface';
import { ITransaction } from '../../src/application/repository/transaction.interface';
import { DBService } from '../../src/infrastructure/db/db.service';
import { IDBService } from '../../src/application/db.service.interface';
import { TodoListRepository } from '../../src/infrastructure/db/repository/todoList.repository';
import { v4 as uuidV4 } from 'uuid';
import { inspect } from 'util';
import { Logger } from '@nestjs/common';
import { DatabaseModule } from '../../src/infrastructure/db/database.module';

describe('Transaction', () => {
    let dbService: IDBService;
    let todoListRepository: ITodoListRepository;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                // UtilsModule,
                // TypeOrmModule.forRootAsync({
                //     imports: [UtilsModule],
                //     inject: [Connection],
                //     useClass: TypeOrmConfigService,
                // }),
                // TodoListEntityRepository,
                // TaskEntityRepository,
                // OwnerEntityRepository,
                // TypeOrmModule.forFeature([TodoListEntityRepository, TaskEntityRepository, OwnerEntityRepository]),
                // DBService,
                // TodoListRepository,
                DatabaseModule,
            ],
        }).compile();

        Logger.log(inspect(moduleRef, { showHidden: true, depth: 2 }));
        dbService = moduleRef.get<DBService>(DBService);
        todoListRepository = moduleRef.get<TodoListRepository>(TodoListRepository);
    });

    describe('a simpe transaction', () => {
        it('should properly rollback the transaction', async () => {
            const t1: ITransaction = dbService.newTransaction();
            await t1.start();
            const todoList: StoredTodoList = await todoListRepository.save(TodoList.createNewTodoList('todolist1', new OwnerId(uuidV4())), t1);
            const retrievedTodoListInTransaction: StoredTodoList | undefined = await todoListRepository.findByPKey(todoList.id);
            expect(retrievedTodoListInTransaction).toBeDefined();
            t1.rollback();
            const retrievedTodoListOutsideTransaction: StoredTodoList | undefined = await todoListRepository.findByPKey(todoList.id);
            expect(retrievedTodoListOutsideTransaction).toBeUndefined();
        });
    });
});
