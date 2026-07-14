import type { Next } from 'hono'
import type { IMiddleware } from '../interfaces/imiddleware.ts'
import type { AppContext } from '../types/app-context.ts'

export function middlewareAdapter(middleware: IMiddleware) {
  return (c: AppContext, next: Next) => middleware.handle(c, next)
}
