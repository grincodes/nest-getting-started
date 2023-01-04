import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

export class InterceptReqWithUser implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        let request = context.switchToHttp().getRequest()
        request.user = {
            "email": "bobo",
            "firstname": "badoo"
        }

        
        return next
          .handle()
          
    }

}