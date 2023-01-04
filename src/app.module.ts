import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { CatsController } from "./cats/cats.controller"
import { CatsModule } from "./cats/cats.module"
import { logger, LoggerMiddleware } from "./middleware/logger.middleware"
import cors from "cors"
import helmet from "helmet"
import { SequelizeModule } from "@nestjs/sequelize"

@Module({
  imports: [CatsModule,
      SequelizeModule.forRoot({
        dialect:"mysql",
        host: "localhost",
        port: 3306,
        username:"root",
        password: "12345678",
        database:"testNestjs",
        models:[]
      })  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //possibility can take in a specific route
    // consumer
    // .apply(LoggerMiddleware)
    // .forRoutes({ path: 'cats', method: RequestMethod.GET });

    // applying class based middleware
    //consumer.apply(LoggerMiddleware).forRoutes(CatsController)

    // appying function based middleware
    consumer.apply(logger).forRoutes(CatsController)

    //multiple middleware executed sequentially
    // consumer.apply(cors(), helmet(), logger).forRoutes(CatsController)
  }
}
