import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationSchema } from './utils/configuration/configuration.validator';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`, // load .env files based on env
            ignoreEnvFile: process.env.NODE_ENV === 'production', // ignore .env files in production
            validationSchema: ConfigurationSchema,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
