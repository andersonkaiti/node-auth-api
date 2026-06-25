import type { NextFunction, Request, Response } from 'express'
import type { IMiddleware } from '../interfaces/imiddleware.ts'

export class AuthorizationMiddleware implements IMiddleware {
  constructor(private readonly allowedRoles: string[]) {}

  async handle(
    { metadata }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    if (!metadata?.account) {
      res.status(403).json({
        error: 'Access denied',
      })

      return
    }

    if (!this.allowedRoles.includes(metadata?.account?.role)) {
      res.status(403).json({
        error: 'Access denied',
      })

      return
    }

    next()
  }
}
