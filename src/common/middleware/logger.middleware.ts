import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger();

  use(req: Request, res: Response, next: any) {
    const { method, url, headers, originalUrl } = req;

    this.logger.verbose(`${method} : ${process.env.BASE_URL}${originalUrl}`);

    this.logger.debug(`${headers['authorization']}`);

    next();
  }
}
