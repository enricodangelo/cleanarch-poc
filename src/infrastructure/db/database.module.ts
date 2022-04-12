import { Module } from '@nestjs/common';
import { TODOLIST_REPOSITORY_TOKEN } from '../../domain/repository/todoList.repository.interface';
import { UtilsModule } from '../../utils/utils.module';
import { DBService } from './db.service';
import { DB_SERVICE_TOKEN } from './db.service.interface';
import { TodoListRepository } from './repository/todoList.repository';

@Module({
    imports: [UtilsModule],
    // providers: [...databaseProviders, { provide: DB_SERVICE_TOKEN, useClass: DBService }, { provide: TODOLIST_REPOSITORY_TOKEN, useClass: TodoListRepository }],
    // exports: [...databaseProviders, DB_SERVICE_TOKEN, TODOLIST_REPOSITORY_TOKEN],
    providers: [
        { provide: DB_SERVICE_TOKEN, useClass: DBService },
        { provide: TODOLIST_REPOSITORY_TOKEN, useClass: TodoListRepository },
    ],
    exports: [DB_SERVICE_TOKEN, TODOLIST_REPOSITORY_TOKEN],
})
export class DatabaseModule {}
