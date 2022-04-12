import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestApiModule } from './infrastructure/restapi/http.module';
import { ConfigurationService } from './utils/configuration/configuration.service';
import { UtilsModule } from './utils/utils.module';

@Module({
    imports: [UtilsModule, RestApiModule],
})
export class AppModule {}
// constructor(private connection: Connection) {}
// }
