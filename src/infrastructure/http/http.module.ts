import { Logger, Module } from '@nestjs/common';
import { ApplicationModule } from '../../application/application.module';
import { UtilModule } from '../../utils/util.module';
import { Test01Controller } from './controller/test01.controller';
import { Test02Controller } from './controller/test02.controller';
import { TodoListController } from './controller/todoList.controller';

@Module({
    imports: [ApplicationModule, UtilModule],
    controllers: [TodoListController, Test01Controller, Test02Controller],
})
export class HTTPModule {
    constructor() {
        Logger.debug(`HTTPModule constructed`);
    }
}
