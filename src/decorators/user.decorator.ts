import { createParamDecorator, ExecutionContext } from "@nestjs/common";

//normal
// export const User = createParamDecorator((data:unknown,ctx: ExecutionContext)=>{
//     const request = ctx.switchToHttp().getRequest()
//     return request.user
// })

//handles passing data to decorator to target specifics
export const User = createParamDecorator((data:string,ctx: ExecutionContext)=>{
    const request = ctx.switchToHttp().getRequest()
    const user = request.user

    return data? user?.[data] : user
})