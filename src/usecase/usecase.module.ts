import { Module } from '@nestjs/common';
import { DatabaseModule } from '../infrastructure/db/database.module';
import { CreateNewListUsecase } from './createNewList.usecase copy';
import { GetTodoListsByIdUsecase } from './getTodoListsById.usecase';

@Module({
    imports: [DatabaseModule],
    providers: [CreateNewListUsecase, GetTodoListsByIdUsecase],
    exports: [CreateNewListUsecase, GetTodoListsByIdUsecase],
})
export class UsecaseModule {}
