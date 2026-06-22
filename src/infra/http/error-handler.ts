import type { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { ConflictError } from '../../application/errors/conflict-error.ts'
import { Unauthorized } from '../../application/errors/unauthorized-error.ts'

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof ZodError) {
    res.status(400).json({
      error: error.issues,
    })
  }

  if (error instanceof ConflictError) {
    res.status(409).json({
      error: error.message,
    })
  }

  if (error instanceof Unauthorized) {
    res.status(401).json({
      error: error.message,
    })
  }

  res.status(500).json({
    error: error.message,
  })
}
