import { Logger, Module } from '@nestjs/common';
import { HTTPModule } from './infrastructure/http/http.module';

@Module({
    imports: [HTTPModule],
})
export class MainModule {
    private readonly logger = new Logger(MainModule.name);

    constructor() {
        this.logger.debug(`CleanArchModule constructed`);
    }
}
