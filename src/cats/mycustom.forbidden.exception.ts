import { HttpException, HttpStatus } from "@nestjs/common"

export class MyCustomForbiddenException extends HttpException{
    constructor(){
        super('Forbidden',HttpStatus.FORBIDDEN)
    }
}