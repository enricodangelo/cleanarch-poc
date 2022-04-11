import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig, dbDialectType, HTTPServerConfig } from './configuration.interface';

@Injectable()
export class ConfigurationService {
    constructor(private configService: ConfigService) {}

    get httpServerConfig(): HTTPServerConfig {
        return {
            port: this.configService.get<number>('PORT') as number,
        };
    }

    get databaseConfig(): DatabaseConfig {
        return {
            dialect: this.configService.get<dbDialectType>('DATABASE__DIALECT') as dbDialectType,
            username: this.configService.get<string>('DATABASE__USERNAME') as string,
            password: this.configService.get<string>('DATABASE__PASSWORD') as string,
            host: this.configService.get<string>('DATABASE__HOST') as string,
            port: this.configService.get<number>('DATABASE__PORT') || 5432,
            name: this.configService.get<string>('DATABASE__NAME') as string,
        };
    }
}
