import { Module } from '@nestjs/common';
import { ConfigurationService } from './configuration/configuration.service';

@Module({
    imports: [],
    providers: [ConfigurationService],
    exports: [ConfigurationService],
})
export class UtilsModule {}
