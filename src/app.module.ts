import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { TypeOrmConfigService } from './infrastructure/db/typeormConfiguration.service';
import { RestApiModule } from './infrastructure/restapi/http.module';
import { ConfigurationService } from './utils/configuration/configuration.service';
import { UtilsModule } from './utils/utils.module';

@Module({
    imports: [
        UtilsModule,
        RestApiModule,
        TypeOrmModule.forRootAsync({
            imports: [UtilsModule, Connection],
            inject: [ConfigurationService, Connection],
            useClass: TypeOrmConfigService,
        }),
    ],
})
export class AppModule {}
// constructor(private connection: Connection) {}
// }
