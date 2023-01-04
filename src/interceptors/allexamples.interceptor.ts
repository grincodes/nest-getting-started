


import { Injectable, NestInterceptor, ExecutionContext, CallHandler, RequestTimeoutException, BadGatewayException } from '@nestjs/common';
import { Observable, of, throwError, TimeoutError } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';


//exclude null interceptor
@Injectable()
export class ExcludeNullInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((value) => (value === null ? "" : value)))
  }
}

//errors interceptor
@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(catchError((err) => throwError(() => new BadGatewayException())))
  }
}


//cache interceptor
@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isCached = true
    if (isCached) {
      return of([]) //of returns a stream 
    }
    return next.handle()
  }
}

// TimeoutInterceptor
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(5000),
      catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err);
      }),
    );
  };
};