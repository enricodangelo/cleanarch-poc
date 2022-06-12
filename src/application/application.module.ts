import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../infrastructure/db/database.module';
import { AuthorizationService } from './authorization.service';
import { AUTHORIZATION_SERVICE_INTERFACE } from './authorization.service.interface';
import { CreateNewListUsecase } from './usecase/createNewList.usecase';
import { GetTodoListsByIdUsecase } from './usecase/getTodoListsById.usecase';
import { Test01Usecase } from './usecase/test01.usecase';
import { Test02Usecase } from './usecase/test02.usecase';

@Module({
    imports: [ConfigModule, DatabaseModule],
    providers: [
        { provide: AUTHORIZATION_SERVICE_INTERFACE, useClass: AuthorizationService },
        CreateNewListUsecase,
        GetTodoListsByIdUsecase,
        Test01Usecase,
        Test02Usecase,
    ],
    exports: [AUTHORIZATION_SERVICE_INTERFACE, CreateNewListUsecase, GetTodoListsByIdUsecase, Test01Usecase, Test02Usecase],
})
export class ApplicationModule {
    private readonly logger = new Logger(ApplicationModule.name);

    constructor() {
        this.logger.debug(`ApplicationModule constructed`);
    }
}
