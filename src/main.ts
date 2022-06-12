import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MainModule } from './main.module';
import { ConfigurationService } from './utils/configuration/configuration.service';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(MainModule, {
        logger: ['debug'], // TODO add logging info to configuration
    });
    // const logger = new Logger('main');
    const config: ConfigurationService = app.get<ConfigurationService>(ConfigurationService);

    await app.listen(config.httpServerConfig.port);
    // logger.log(`Application started.`);
    // logger.log(`Application listening on port: ${config.httpServerConfig.port}.`);
}

bootstrap();
