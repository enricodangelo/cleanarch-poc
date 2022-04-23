import { NestFactory } from '@nestjs/core';
import { CleanArchModule } from './cleanArch.module';
import { ConfigurationService } from './utils/configuration/configuration.service';

async function bootstrap() {
    const app = await NestFactory.create(CleanArchModule, {
        logger: ['debug'], // TODO add logging info to configuration
    });

    const config: ConfigurationService = app.get<ConfigurationService>(ConfigurationService);

    await app.listen(config.httpServerConfig.port);
}
bootstrap();
