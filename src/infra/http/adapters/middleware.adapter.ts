import type { NextFunction, Request, Response } from 'express'
import type { IMiddleware } from '../interfaces/imiddleware.ts'

export function middlewareAdapter(middleware: IMiddleware) {
  return async (req: Request, res: Response, next: NextFunction) =>
    await middleware.handle(req, res, next)
}
