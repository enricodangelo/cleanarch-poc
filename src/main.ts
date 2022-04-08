import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigurationService } from './utils/configuration/configuration.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config: ConfigurationService = app.get<ConfigurationService>(ConfigurationService);
    console.log(`config.databaseConfig: ${JSON.stringify(config.databaseConfig)}`);

    await app.listen(config.httpServerConfig.port);
}
bootstrap();
