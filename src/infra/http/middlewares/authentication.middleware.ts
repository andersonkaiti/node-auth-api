import type { Next } from 'hono'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { env } from '../../../shared/env.ts'
import type { IMiddleware } from '../interfaces/imiddleware.ts'
import type { AppContext } from '../types/app-context.ts'

const jwtPayloadSchema = z.object({
  sub: z.string(),
  role: z.uuid(),
})

export class AuthenticationMiddleware implements IMiddleware {
  async handle(c: AppContext, next: Next): Promise<Response | void> {
    const authorization = c.req.header('authorization')

    if (!authorization) {
      return c.json({ error: 'Invalid access token' }, 401)
    }

    try {
      const [prefix, accessToken] = authorization.split(' ')

      if (prefix !== 'Bearer') {
        return c.json({ error: 'Invalid access token' }, 401)
      }

      const rawPayload = jwt.verify(accessToken, env.JWT_SECRET)
      const payload = jwtPayloadSchema.parse(rawPayload)

      c.set('account', {
        accountId: payload.sub,
        role: payload.role,
      })

      await next()
    } catch {
      return c.json({ error: 'Invalid access token' }, 401)
    }
  }
}
