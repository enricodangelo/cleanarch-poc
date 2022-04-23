import { Logger, Module } from '@nestjs/common';
import { RestApiModule } from './infrastructure/restapi/restapi.module';

@Module({
    imports: [RestApiModule],
})
export class CleanArchModule {
    constructor() {
        Logger.debug(`CleanArchModule constructed`);
    }
}
