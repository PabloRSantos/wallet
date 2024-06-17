import {
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionMiddleware implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionMiddleware.name);

  catch(exception: HttpException) {
    const status: HttpStatus = exception.getStatus();
    const error: any = exception.getResponse();

    this.logger.error(`Http status: ${status} Error message: ${error.message}`);

    return {
      status,
      data: null,
      error: error.message,
    };
  }
}
