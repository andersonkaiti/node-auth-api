import type { Next } from 'hono'
import type { AppContext } from '../types/app-context.ts'

export interface IMiddleware {
  handle(c: AppContext, next: Next): Promise<Response | void>
}
