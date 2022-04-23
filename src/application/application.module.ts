import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthorizationService } from './authorization.service';
import { AUTHORIZATION_SERVICE_TOKEN } from './authorization.service.interface';

@Module({
    imports: [ConfigModule],
    providers: [{ provide: AUTHORIZATION_SERVICE_TOKEN, useClass: AuthorizationService }],
    exports: [AUTHORIZATION_SERVICE_TOKEN],
})
export class ApplicationModule {
    constructor() {
        Logger.debug(`ApplicationModule constructed`);
    }
}
