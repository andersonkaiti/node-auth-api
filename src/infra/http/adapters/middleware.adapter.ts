import type { Next } from 'hono'
import type { AppContext } from '../types/app-context.ts'
import type { IMiddleware } from '../interfaces/imiddleware.ts'

export function middlewareAdapter(middleware: IMiddleware) {
  return (c: AppContext, next: Next) => middleware.handle(c, next)
}
