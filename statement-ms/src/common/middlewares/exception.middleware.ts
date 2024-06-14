import {
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionMiddleware implements ExceptionFilter {
  catch(exception: HttpException) {
    const status: HttpStatus = exception.getStatus();
    const error: any = exception.getResponse();

    return {
      status,
      data: null,
      error: error.message,
    };
  }
}
