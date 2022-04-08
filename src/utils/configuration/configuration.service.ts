import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './configuration.interface';

@Injectable()
export class ConfigurationService {
    constructor(private configService: ConfigService) {}

    get databaseConfig(): DatabaseConfig {
        return {
            dialect: this.configService.get<string>('DATABASE__DIALECT'),
            username: this.configService.get<string>('DATABASE__USERNAME'),
            password: this.configService.get<string>('DATABASE__PASSWORD'),
            host: this.configService.get<string>('DATABASE__HOST'),
            port: this.configService.get<number>('DATABASE__PORT'),
            name: this.configService.get<string>('DATABASE__NAME'),
        };
    }
}
