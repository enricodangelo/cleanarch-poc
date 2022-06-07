import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
// import { Connection } from 'pg';    // from previous commit
import { TODOLIST_REPOSITORY_INTERFACE } from '../../application/repository/todoList.repository.interface';
import { UtilModule } from '../../utils/util.module';
import { DBService } from './db.service';
import { DB_SERVICE_INTERFACE } from '../../application/db.service.interface';
import { TodoListRepository } from './repository/todoList.repository';
// import { OwnerEntityRepository } from './repository/typeorm/ownerEntity.repository';
// import { TaskEntityRepository } from './repository/typeorm/taskEntity.repository';
// import { TodoListEntityRepository } from './repository/typeorm/todoListEntity.repository';
import { TypeOrmConfigService } from './typeormConfiguration.service';
import { TodoListEntity } from './entity/todoList.entity';
import { TaskEntity } from './entity/task.entity';
import { OwnerEntity } from './entity/owner.entity';

@Module({
    // imports: [UtilModule],
    imports: [
        UtilModule,
        TypeOrmModule.forRootAsync({
            imports: [UtilModule],
            inject: [Connection],
            useClass: TypeOrmConfigService,
        }),
        TypeOrmModule.forFeature([TodoListEntity, TaskEntity, OwnerEntity]),
    ],
    providers: [
        { provide: DB_SERVICE_INTERFACE, useClass: DBService },
        { provide: TODOLIST_REPOSITORY_INTERFACE, useClass: TodoListRepository },
        // TodoListEntityRepository,
        // TaskEntityRepository,
        // OwnerEntityRepository,
    ],
    exports: [DB_SERVICE_INTERFACE, TODOLIST_REPOSITORY_INTERFACE],
})
export class DatabaseModule {
    constructor() {
        Logger.debug(`DatabaseModule constructed`);
    }
}
