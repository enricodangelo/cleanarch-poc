import { Logger, Module } from '@nestjs/common';
import { UsecaseModule } from '../../application/usecase/usecase.module';
import { UtilModule } from '../../utils/util.module';
import { TodoListController } from './controller/todoList.controller';

@Module({
    imports: [UsecaseModule, UtilModule],
    controllers: [TodoListController],
})
export class HTTPModule {
    constructor() {
        Logger.debug(`HTTPModule constructed`);
    }
}
