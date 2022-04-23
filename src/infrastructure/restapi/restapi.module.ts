import { Logger, Module } from '@nestjs/common';
import { UsecaseModule } from '../../usecase/usecase.module';
import { TodoListController } from './controller/todoList.controller';

@Module({
    imports: [UsecaseModule],
    controllers: [TodoListController],
})
export class RestApiModule {
    constructor() {
        Logger.debug(`RestApiModule constructed`);
    }
}
