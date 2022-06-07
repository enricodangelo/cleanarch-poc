import { Logger, Module } from '@nestjs/common';
import { ApplicationModule } from '../../application/application.module';
import { UtilModule } from '../../utils/util.module';
import { TestController } from './controller/test.controller';
import { TodoListController } from './controller/todoList.controller';

@Module({
    imports: [ApplicationModule, UtilModule],
    controllers: [TodoListController, TestController],
})
export class HTTPModule {
    constructor() {
        Logger.debug(`HTTPModule constructed`);
    }
}
