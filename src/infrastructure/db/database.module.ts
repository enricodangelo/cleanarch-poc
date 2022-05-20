import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'pg';
import { TODOLIST_REPOSITORY_INTERFACE } from '../../domain/repository/todoList.repository.interface';
import { UtilsModule } from '../../utils/utils.module';
import { DBService } from './db.service';
import { DB_SERVICE_INTERFACE } from './db.service.interface';
import { TodoListRepository } from './repository/todoList.repository';
import { OwnerEntityRepository } from './repository/typeorm/ownerEntity.repository';
import { TaskEntityRepository } from './repository/typeorm/taskEntity.repository';
import { TodoListEntityRepository } from './repository/typeorm/todoListEntity.repository';
import { TypeOrmConfigService } from './typeormConfiguration.service';

@Module({
    imports: [
        UtilsModule,
        TypeOrmModule.forRootAsync({
            imports: [UtilsModule],
            inject: [Connection],
            useClass: TypeOrmConfigService,
        }),
        TodoListEntityRepository,
        TaskEntityRepository,
        OwnerEntityRepository,
        // TypeOrmModule.forFeature([TodoListEntityRepository, TaskEntityRepository, OwnerEntityRepository]),
    ],
    providers: [
        { provide: DB_SERVICE_INTERFACE, useClass: DBService },
        { provide: TODOLIST_REPOSITORY_INTERFACE, useClass: TodoListRepository },
        TypeOrmConfigService,
        TodoListEntityRepository,
        TaskEntityRepository,
        OwnerEntityRepository,
    ],
    exports: [DB_SERVICE_INTERFACE, TODOLIST_REPOSITORY_INTERFACE, TypeOrmConfigService, TodoListEntityRepository, TaskEntityRepository, OwnerEntityRepository],
})
export class DatabaseModule {
    constructor() {
        Logger.debug(`DatabaseModule constructed`);
    }
}
