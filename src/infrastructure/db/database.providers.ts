import { Connection, createConnection } from 'typeorm';
import { ConfigurationService } from '../../utils/configuration/configuration.service';
import { TaskEntity } from './entity/task.entity';
import { TodoListEntity } from './entity/todoList.entity';

export const databaseProviders = [
    {
        provide: 'ASYNC_CONNECTION',
        inject: [ConfigurationService, Connection],
        useFactory: async (configurationService: ConfigurationService) =>
            await createConnection({
                type: configurationService.databaseConfig.dialect,
                host: configurationService.databaseConfig.host,
                port: configurationService.databaseConfig.port,
                username: configurationService.databaseConfig.username,
                password: configurationService.databaseConfig.password,
                database: configurationService.databaseConfig.name,
                entities: [TodoListEntity, TaskEntity],
                synchronize: true,
                uuidExtension: 'pgcrypto',
            }),
    },
];
