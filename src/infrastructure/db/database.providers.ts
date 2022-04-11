import { createConnection } from 'typeorm';
import { ConfigurationService } from '../../utils/configuration/configuration.service';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async (configurationService: ConfigurationService) =>
            await createConnection({
                type: configurationService.databaseConfig.dialect,
                host: configurationService.databaseConfig.host,
                port: configurationService.databaseConfig.port,
                username: configurationService.databaseConfig.username,
                password: configurationService.databaseConfig.password,
                database: configurationService.databaseConfig.name,
                entities: [__dirname + '/entity/*.entity{.ts,.js}'],
                synchronize: true,
            }),
    },
];
