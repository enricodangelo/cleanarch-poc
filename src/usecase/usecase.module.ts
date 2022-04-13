import { Module } from '@nestjs/common';
import { ApplicationModule } from '../application/application.module';
import { DatabaseModule } from '../infrastructure/db/database.module';
import { CreateNewListUsecase } from './createNewList.usecase';
import { GetTodoListsByIdUsecase } from './getTodoListsById.usecase';

@Module({
    imports: [DatabaseModule, ApplicationModule],
    providers: [CreateNewListUsecase, GetTodoListsByIdUsecase],
    exports: [CreateNewListUsecase, GetTodoListsByIdUsecase],
})
export class UsecaseModule {}
