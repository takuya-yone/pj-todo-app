import { Injectable, Logger, type NestMiddleware } from '@nestjs/common'
import type { Request, Response } from 'express'
const logger = new Logger('LoggerMiddleware')

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    // logger.log(`${req.method} ${req.ip} ${req.url}`);
    const { ip, method, originalUrl } = req
    const userAgent = req.get('user-agent') || ''
    res.on('finish', () => {
      const { statusCode } = res
      // const contentLength = res.get('content-length');

      logger.log(`${method} ${originalUrl} ${statusCode} - ${userAgent} ${ip}`)
    })
    next()
  }
}
