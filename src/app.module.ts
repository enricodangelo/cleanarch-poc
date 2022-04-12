import { Module } from '@nestjs/common';
import { RestApiModule } from './infrastructure/restapi/http.module';
import { UtilsModule } from './utils/utils.module';

@Module({
    imports: [UtilsModule, RestApiModule],
})
export class AppModule {}
