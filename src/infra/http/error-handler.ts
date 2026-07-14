import { ConflictError } from '@errors/conflict.error.ts'
import { Unauthorized } from '@errors/unauthorized.error.ts'
import type { Context } from 'hono'
import { ZodError } from 'zod'

export function errorHandler(error: Error, c: Context): Response {
  if (error instanceof ZodError) {
    return c.json({ error: error.issues }, 400)
  }

  if (error instanceof ConflictError) {
    return c.json({ error: error.message }, 409)
  }

  if (error instanceof Unauthorized) {
    return c.json({ error: error.message }, 401)
  }

  return c.json({ error: error.message }, 500)
}
