import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../infrastructure/db/database.module';
import { AuthorizationService } from './authorization.service';
import { AUTHORIZATION_SERVICE_INTERFACE } from './authorization.service.interface';
import { CreateNewListUsecase } from './usecase/createNewList.usecase';
import { GetTodoListsByIdUsecase } from './usecase/getTodoListsById.usecase';
import { TestUsecase } from './usecase/test.usecase';

@Module({
    imports: [ConfigModule, DatabaseModule],
    providers: [{ provide: AUTHORIZATION_SERVICE_INTERFACE, useClass: AuthorizationService }, CreateNewListUsecase, GetTodoListsByIdUsecase, TestUsecase],
    exports: [AUTHORIZATION_SERVICE_INTERFACE, CreateNewListUsecase, GetTodoListsByIdUsecase, TestUsecase],
})
export class ApplicationModule {
    constructor() {
        Logger.debug(`ApplicationModule constructed`);
    }
}
