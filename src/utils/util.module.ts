import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationService } from './configuration/configuration.service';
import { ConfigurationSchema } from './configuration/configuration.validator';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`, // load .env files based on env
            ignoreEnvFile: process.env.NODE_ENV === 'production', // ignore .env files in production
            validationSchema: ConfigurationSchema,
        }),
    ],
    providers: [ConfigurationService],
    exports: [ConfigurationService],
})
export class UtilModule {
    private readonly logger = new Logger(UtilModule.name);

    constructor() {
        this.logger.debug(`UtilsModule constructed`);
    }
}
