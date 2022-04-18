import { Module } from '@nestjs/common';
import { TODOLIST_REPOSITORY_TOKEN } from '../../domain/repository/todoList.repository.interface';
import { UtilsModule } from '../../utils/utils.module';
import { DBService } from './db.service';
import { DB_SERVICE_TOKEN } from './db.service.interface';
import { TodoListRepository } from './repository/todoList.repository';
import { TypeOrmConfigService } from './typeormConfiguration.service';

@Module({
    imports: [UtilsModule],
    providers: [{ provide: DB_SERVICE_TOKEN, useClass: DBService }, { provide: TODOLIST_REPOSITORY_TOKEN, useClass: TodoListRepository }, TypeOrmConfigService],
    exports: [DB_SERVICE_TOKEN, TODOLIST_REPOSITORY_TOKEN, TypeOrmConfigService],
})
export class DatabaseModule {}
