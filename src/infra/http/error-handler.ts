import type { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { ConflictError } from '../../application/errors/conflict-error.ts'
import { Unauthorized } from '../../application/errors/unauthorized-error.ts'

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response {
  if (error instanceof ZodError) {
    return res.status(400).json({
      error: error.issues,
    })
  }

  if (error instanceof ConflictError) {
    return res.status(409).json({
      error: error.message,
    })
  }

  if (error instanceof Unauthorized) {
    return res.status(401).json({
      error: error.message,
    })
  }

  return res.status(500).json({
    error: error.message,
  })
}
