import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { DBService } from './db.service';
import { DB_SERVICE_TOKEN } from './db.service.interface';

@Module({
    providers: [...databaseProviders, { provide: DB_SERVICE_TOKEN, useClass: DBService }],
    exports: [...databaseProviders],
})
export class DatabaseModule {}
