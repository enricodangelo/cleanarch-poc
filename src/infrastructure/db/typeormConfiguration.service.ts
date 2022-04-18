import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigurationService } from '../../utils/configuration/configuration.service';
import { OwnerEntity } from './entity/owner.entity';
import { TaskEntity } from './entity/task.entity';
import { TodoListEntity } from './entity/todoList.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private readonly configurationService: ConfigurationService) {}

    async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
        return {
            type: this.configurationService.databaseConfig.dialect,
            host: this.configurationService.databaseConfig.host,
            port: this.configurationService.databaseConfig.port,
            username: this.configurationService.databaseConfig.username,
            password: this.configurationService.databaseConfig.password,
            database: this.configurationService.databaseConfig.name,
            entities: [TodoListEntity, TaskEntity, OwnerEntity],
            synchronize: true,
            uuidExtension: 'pgcrypto',
        };
    }
}
