import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
class LoggingMiddleware implements NestMiddleware {
    private readonly logger = new Logger('HTTP');

    use(request: Request, response: Response, next: NextFunction) {
        // log when request is received
        const { method, originalUrl } = request;

        const message = `${method} ${originalUrl}`;

        this.logger.log(message);

        response.on('finish', () => {
            // log when response is sent
            const { method, originalUrl } = request;
            const { statusCode, statusMessage } = response;

            const message = `${method} ${originalUrl} ${statusCode} ${statusMessage}`;

            if (statusCode >= 500) {
                return this.logger.error(message);
            }

            if (statusCode >= 400) {
                return this.logger.warn(message);
            }

            return this.logger.log(message);
        });

        next();
    }
}

export default LoggingMiddleware;
