import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Redirect,
  Req,
  SetMetadata,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from "@nestjs/common"
import { Request } from "express"
import { Observable, of } from "rxjs"
import { Roles } from "src/auth/role.decorator"
import { RoleGuard } from "src/auth/role.guard"
import { User } from "src/decorators/user.decorator"
import { InterceptReqWithUser } from "src/interceptors/intercept_request_with_user"
import { Cat } from "./cats.interface"
import { CatsService } from "./cats.service"
import { createCatSchema } from "./createCatSchema"
import { ValidationPipe } from "./customvalidation.pipe"
import { CreateCatDto } from "./dto/create-cat.dto"
import { JoiValidationPipe } from "./joi-custom-validation.pipe"
import { MyCustomForbiddenException } from "./mycustom.forbidden.exception"
import { MyCustomHttpExceptionFilter } from "./mycustomhttp.exception.filters"

@Controller("cats")
// @UseGuards(RoleGuard)
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Get()
  findAllCats(@Req() request: Request): string {
    return "This action returns all cats"
  }

  @Get("redirect-cats")
  @Redirect("https://nestjs.com", 301)
  redirect() {}

  @UseInterceptors(InterceptReqWithUser)
  @Get("/user")
  async findOneUser(@User() user: any) {
    console.log(user)
    return user
  }

  @UseInterceptors(InterceptReqWithUser)
  @Get("/useremail")
  async findOneUserEmail(@User('email') email: any) {
    console.log(email)
    return email
  }

  @Get(":id")
  findOne(@Param() params): string {
    return `This action returns a #${params.id} cat`
  }

  //pipe
  @Get(":breed/:id")
  findOneCat(
    @Param("id", ParseIntPipe) idParam,
    @Param("breed") breedParam,
  ): string {
    return `This action returns a #${breedParam} cat with id ${idParam}`
  }

  //Pipe
  //   @Get(":breed/:id")
  //   findOneCatPipe(@Param('id', new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE}))
  //     id: number
  //   ){
  //         return this.catsService.findOne(id)
  //   }

  @Get("/promised-cats")
  async findAlPromisedCats(): Promise<any[]> {
    return []
  }

  @Get("/observable-cats")
  findAllObservableCats(): Observable<any[]> {
    return of([])
  }

  @UseFilters(MyCustomHttpExceptionFilter)
  @Get()
  async findAll(): Promise<Cat[]> {
    try {
      return this.catsService.findAll()
    } catch (error) {
      // throwing http exception
      // throw new HttpException(
      //   {
      //     status: HttpStatus.FORBIDDEN,
      //     error: "This is a custom message",
      //   },
      //   HttpStatus.FORBIDDEN,
      //   {
      //     // for logging error object to the console or any logger
      //     cause: error,
      //   },
      // )

      //throwing custom exception
      throw new MyCustomForbiddenException()
    }
  }

  @Post()
  @Roles("admin")
  @UsePipes(new JoiValidationPipe(createCatSchema))
  async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto)
  }

  @Post()
  @HttpCode(204)
  createdwithStatus(): string {
    return "created with status 204"
  }

  @Header("content-type", "json")
  @Post("/custom-header")
  customHeader() {
    return "cats with custom header"
  }
}
