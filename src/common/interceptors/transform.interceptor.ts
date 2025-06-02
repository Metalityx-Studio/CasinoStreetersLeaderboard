import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  data: T | null;
  message: string;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const { message, ...rest } = data;
        return {
          success: true,
          data: Object.keys(rest).length ? rest : null,
          message: message || 'Success',
        };
      }),
      catchError((error) => {
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';

        if (error instanceof HttpException) {
          status = error.getStatus();
          const errorResponse = error.getResponse();
          message =
            typeof errorResponse === 'string'
              ? errorResponse
              : errorResponse['message'] || error.message;
        }

        throw new HttpException(
          {
            success: false,
            data: null,
            message: message,
          },
          status,
        );
      }),
    );
  }
}
