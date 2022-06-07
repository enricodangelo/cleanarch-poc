import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { IDBService } from '../../application/db.service.interface';
import { ITransaction } from '../../application/repository/transaction.interface';
import { Transaction } from './transaction';
import { TaskEntity } from './entity/task.entity';
import { OwnerEntity } from './entity/owner.entity';
import { TodoListEntity } from './entity/todoList.entity';
import { ConfigurationService } from '../../utils/configuration/configuration.service';

@Injectable()
export class DBService implements IDBService, TypeOrmOptionsFactory {
    constructor(private readonly configurationService: ConfigurationService, private readonly connection: Connection) {}

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

    newTransaction(): ITransaction {
        return new Transaction(this.connection.createQueryRunner());
    }
}
