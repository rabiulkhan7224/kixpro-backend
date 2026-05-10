import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { TypeORMError } from 'typeorm';
export interface CustomExceptionResponse {
  statusCode: number;
  message: string;
  error: string;
}

@Catch(HttpException, TypeORMError, Error)
export class AllExceptionFilter<T extends HttpException | TypeORMError> implements ExceptionFilter {
  private readonly logger = new Logger();
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const request = ctx.getRequest();
    const { method, originalUrl, query, headers, params, body } = request;
    const requestId = headers?.requestId;
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    try {
      const { statusCode, message, error }: CustomExceptionResponse =
        exception instanceof HttpException
          ? (exception.getResponse() as CustomExceptionResponse)
          : {
              statusCode: status,
              message: exception.message,
              error: exception.name,
            };

      const stack = exception['stack'] || message;
      // debug log
      this.logger.debug(
        `${method}: ${originalUrl};
        Params: ${JSON.stringify(params)};
        Query: ${JSON.stringify(query)};
        Body: ${JSON.stringify(body)};`,
        `[DEBUG] [${method}:- ${originalUrl}] {reqID: ${requestId}}`,
      );
      // error log
      this.logger.error(JSON.stringify(exception), `ExceptionFilter [${originalUrl}]: {reqID: ${requestId}}`);
      this.logger.error(JSON.stringify({ stack }), `ExceptionFilter-stack [${originalUrl}]: {reqID: ${requestId}}`);
      // response
      response.status(status).json({
        statusCode,
        success: false,
        message: message,
        error,
        path: originalUrl,
        timestamp: new Date().toISOString(),
        ...(process.env.NODE_ENV === 'development' && { stack }),
      });
    } catch (error) {
      this.logger.error(JSON.stringify(error), `ExceptionFilter processing error: {reqID: ${requestId}}`);
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'Internal Server Error',
        error: 'InternalServerError',
      });
    }
  }
}
