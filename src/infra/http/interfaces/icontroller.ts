import type { AppContext } from '../types/app-context.ts'

export interface IController {
  handle(c: AppContext): Promise<Response>
}
