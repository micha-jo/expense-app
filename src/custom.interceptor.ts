import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map } from "rxjs"

export class CustomInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext, handler: CallHandler
  ) {
    console.log({ context })
    return handler.handle().pipe(
      map((data) => {
        console.log({ data })
        const response = {
          ...data,
          createdAt: data.create_at
        }
        delete response.update_at
        delete response.create_at
        console.log({ response })
        return response
      })
    )
  }
}