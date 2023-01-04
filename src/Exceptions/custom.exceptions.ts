import { HttpException, HttpStatus } from "@nestjs/common"

export class ForbiddenException extends HttpException {
  constructor() {
    super("Forbidden", HttpStatus.FORBIDDEN)
  }
}

//Using ForbiddenException
// @Get()
// async findAll() {
//   throw new ForbiddenException();
// }
