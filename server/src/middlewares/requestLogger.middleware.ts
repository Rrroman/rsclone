import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

const yellow = (text: string) => `\x1B[38;5;3m${text}\x1B[39m`;
// ref: https://github.com/julien-sarazin/nest-playground/issues/1#issuecomment-737729296
@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';
    const start = Date.now();

    response.on('finish', () => {
      const { statusCode } = response;

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} - ${userAgent} - ${yellow(
          `${Date.now() - start}ms`,
        )}`,
      );
    });

    next();
  }
}
