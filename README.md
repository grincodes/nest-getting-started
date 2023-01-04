# cli
 nest g ...
 nest g controller cats


# Discoveries
injects Params into params variable
@Param() params
the value @Param returns is put into params varaible 

@Params('id',Pipe) id:number
how i interpret the above code
id number has a params type injected into it

controller functions are called handlers ; or functions are called handlers



 # Notes
    - Note that when you inject either @Res() or @Response() in a method handler, you put Nest into Library-specific mode for that handler, and you become responsible for managing the response
    - @Injectable makes a provider injectable or usable by other providers this means nestjs handles the invocation to be ioc compliant
    - To inject an Injectable provider (eg service) in another provider ...
        refernce the provider in the constructor with a private access method like this
        ```constructor(private catsService: CatsService) {}```
     nest will handle the invocation and injection it will also consider cases of singleton
     @Injectable declares the CatsService class as a class that can be managed by the Nest IoC container.
    
    -SetMetadata: is used to save metadata on class route object or params 
    this meta data can be retrieved throught the reflector class
# Modules
  In Nest, modules are singletons by default, and thus you can share the same instance of any provider between multiple modules effortlessly.
    - We can export a provider so that it can be used through out the app  by using the exports option in the module 
    - Module class can also inject providers for config purpose
        ```export class CatsModule {
                constructor(private catsService: CatsService) {}
                }```


# Middleware
    nest middleware extends middleware
    they are an injectable class so the can be called anywhere
    they have no config in the @Modules meta data
    so u use them by using the implementing configure function 
    from NestModule in the module u want to use them   

# Exceptions
    handling exceptions ...
    exceptions are hanle by exception filters in nestjs
    nest js catches all http exceptions and sends a response accordingly
    with the right messsage and status code 
    however the default exception handler onlt returns server error for any 
    kinds of exception
    we can creation our custom Exception which needs to extends a class like
    Http Exception
    there we define how we handel the error in terms of what we throw
    Exception filters give u more control over how exceptions are handled
    crate them by extending extension filter
    you can use exception filters by Injection it in the route method or controller 
    class, or globall 
    route and class method use  @useFilters(CustomExecptionFilter)
    global is specifiied in the main using UseGlobalFilters()

# Pipes
    Are for input data validation and data transformation
    pipes operate on arguments beign provided by a controller route handler
    to use pipes you inject them using the @UsePipes() decorator
 
# Guards
    They determine whether a given request will be handled 
    by the route handler or not, 
    depending on certain conditions (like permissions, roles, ACLs, etc.) present at run-time.
    to use to guards you Inject them using the @UseGuards() decorator
    global guards
    ```const app = await NestFactory.create(AppModule);
    app.useGlobalGuards(new RolesGuard());```
    Note: its not a good practice to use metadata on route controller directly
    use it on decorators instead

# Interceptors
    They are used to extend basic funstionality of a behaviour
    ```@UseInterceptors(LoggingInterceptor)``` on controller class
    or method/global

# Custom decorator
    is a function defined to extend the functionality class,method , or params without changing the underlying code
    the value a decorator returns is put into its subject

    Decorators can work with pipes ...


Cqrs
where we want to have a different read model for write model
read model could be optimised with view tables and having extra fields
