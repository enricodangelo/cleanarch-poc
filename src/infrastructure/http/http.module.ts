import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { ApplicationModule } from '../../application/application.module';
import { UtilModule } from '../../utils/util.module';
import { Test01Controller } from './controller/test01.controller';
import { Test02Controller } from './controller/test02.controller';
import { TodoListController } from './controller/todoList.controller';
import LoggingMiddleware from './logging/logging.middleware';

@Module({
    imports: [ApplicationModule, UtilModule],
    controllers: [TodoListController, Test01Controller, Test02Controller],
})
export class HTTPModule {
    private readonly logger = new Logger(HTTPModule.name);

    constructor() {
        this.logger.debug(`HTTPModule constructed`);
    }

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggingMiddleware).forRoutes('*');
    }
}
