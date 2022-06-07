import { Logger, Module } from '@nestjs/common';
import { DatabaseModule } from '../../infrastructure/db/database.module';
import { ApplicationModule } from '../application.module';
import { CreateNewListUsecase } from './createNewList.usecase';
import { GetTodoListsByIdUsecase } from './getTodoListsById.usecase';

@Module({
    imports: [ApplicationModule, DatabaseModule],
    providers: [CreateNewListUsecase, GetTodoListsByIdUsecase],
    exports: [CreateNewListUsecase, GetTodoListsByIdUsecase],
})
export class UsecaseModule {
    constructor() {
        Logger.debug(`UsecaseModule constructed`);
    }
}
