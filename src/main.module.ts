import { Logger, Module } from '@nestjs/common';
import { HTTPModule } from './infrastructure/http/http.module';

@Module({
    imports: [HTTPModule],
})
export class MainModule {
    constructor() {
        Logger.debug(`CleanArchModule constructed`);
    }
}
