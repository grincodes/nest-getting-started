import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

export interface Response<T>{
    data: T
}

export class TransformerInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<Response<T>> {
    return next.handle().pipe(map(data =>({data})))
  }
}