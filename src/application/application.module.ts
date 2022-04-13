import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AUTHORIZATION_SERVICE_TOKEN } from './authorization.service.interface';

@Module({
    providers: [{ provide: AUTHORIZATION_SERVICE_TOKEN, useClass: AuthorizationService }],
    exports: [AUTHORIZATION_SERVICE_TOKEN],
})
export class ApplicationModule {}
