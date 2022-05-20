import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { OwnerId } from '../../src/domain/model/ownerId';
import { StoredTodoList, TodoList } from '../../src/domain/model/todoList';
import { ITodoListRepository, TODOLIST_REPOSITORY_INTERFACE } from '../../src/domain/repository/todoList.repository.interface';
import { ITransaction } from '../../src/domain/repository/transaction.interface';
import { DBService } from '../../src/infrastructure/db/db.service';
import { DB_SERVICE_INTERFACE, IDBService } from '../../src/infrastructure/db/db.service.interface';
import { TodoListRepository } from '../../src/infrastructure/db/repository/todoList.repository';
import { OwnerEntityRepository } from '../../src/infrastructure/db/repository/typeorm/ownerEntity.repository';
import { TaskEntityRepository } from '../../src/infrastructure/db/repository/typeorm/taskEntity.repository';
import { TodoListEntityRepository } from '../../src/infrastructure/db/repository/typeorm/todoListEntity.repository';
import { TypeOrmConfigService } from '../../src/infrastructure/db/typeormConfiguration.service';
import { UtilsModule } from '../../src/utils/utils.module';
import { v4 as uuidV4 } from 'uuid';

describe('Transaction', () => {
    let dbService: IDBService;
    let todoListRepository: ITodoListRepository;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                UtilsModule,
                TypeOrmModule.forRootAsync({
                    imports: [UtilsModule],
                    inject: [Connection],
                    useClass: TypeOrmConfigService,
                }),
                TypeOrmModule.forFeature([TodoListEntityRepository, TaskEntityRepository, OwnerEntityRepository]),
            ],
            providers: [
                { provide: DB_SERVICE_INTERFACE, useClass: DBService },
                { provide: TODOLIST_REPOSITORY_INTERFACE, useClass: TodoListRepository },
                TypeOrmConfigService,
            ],
        }).compile();

        dbService = moduleRef.get<IDBService>(DBService);
        todoListRepository = moduleRef.get<ITodoListRepository>(TodoListRepository);
    });

    describe('a simpe transaction', () => {
        it('should return an array of cats', async () => {
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
