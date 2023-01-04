import { Injectable, NestMiddleware } from "@nestjs/common"
import { Request, Response, NextFunction } from "express"

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log("Request...")

    next()
  }
}

// functional middleware

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log("FRequest...")
  next()
}
