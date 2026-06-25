import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { env } from '../../../shared/env.ts'
import type { IMiddleware } from '../interfaces/imiddleware.ts'

const jwtPayloadSchema = z.object({
  sub: z.string(),
  role: z.enum(['ADMIN', 'USER']),
})

export class AuthenticationMiddleware implements IMiddleware {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { authorization } = req.headers

    if (!authorization) {
      res.status(401).json({
        error: 'Invalid access token',
      })

      return
    }

    try {
      const [prefix, accessToken] = authorization.split(' ')

      if (prefix !== 'Bearer') {
        res.status(401).json({
          error: 'Invalid access token',
        })
      }

      const rawPayload = jwt.verify(accessToken, env.JWT_SECRET)
      const payload = jwtPayloadSchema.parse(rawPayload)

      req.metadata = {
        ...req.metadata,
        account: {
          accountId: payload.sub,
          role: payload.role,
        },
      }

      next()
    } catch {
      res.status(401).json({
        error: 'Invalid access token',
      })
    }
  }
}
