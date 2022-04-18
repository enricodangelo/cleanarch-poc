import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { DatabaseModule } from './infrastructure/db/database.module';
import { OwnerEntity } from './infrastructure/db/entity/owner.entity';
import { TaskEntity } from './infrastructure/db/entity/task.entity';
import { TodoListEntity } from './infrastructure/db/entity/todoList.entity';
import { TypeOrmConfigService } from './infrastructure/db/typeormConfiguration.service';
import { RestApiModule } from './infrastructure/restapi/restapi.module';
import { ConfigurationService } from './utils/configuration/configuration.service';
import { UtilsModule } from './utils/utils.module';

@Module({
    // imports: [
    //     UtilsModule,
    //     RestApiModule,
    //     TypeOrmModule.forRootAsync({
    //         imports: [DatabaseModule, UtilsModule, Connection],
    //         // inject: [ConfigurationService],
    //         useClass: TypeOrmConfigService,
    //     }),
    // ],
    imports: [
        UtilsModule,
        RestApiModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'local',
            password: 'local',
            database: 'cleanarch-poc-local',
            entities: [TodoListEntity, TaskEntity, OwnerEntity],
        }),
    ],
})
export class AppModule {
    constructor(private connection: Connection) {}
  }
