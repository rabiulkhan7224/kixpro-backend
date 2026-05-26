import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const { method, originalUrl } = request;

    return next.handle().pipe(
      tap({
        next: () => {
          const response = ctx.getResponse<Response>();
          const duration = Date.now() - start;
          this.logger.log(`${method} ${originalUrl} ${response.statusCode} - ${duration}ms`);
        },
        error: error => {
          const duration = Date.now() - start;
          this.logger.error(`${method} ${originalUrl} - ${duration}ms - ${error.message || error}`);
        },
      }),
    );
  }
}
