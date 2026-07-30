import type { RefreshTokenUseCase } from '@use-cases/refresh-token.usecase.ts'
import type { Request, Response } from 'express'
import { z } from 'zod'
import type { IController } from '../interfaces/icontroller.ts'

export class RefreshTokenController implements IController {
  private refreshTokenSchema = z.object({
    refreshToken: z.string(),
  })

  constructor(private readonly refreshTokenUseCase: RefreshTokenUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { refreshToken: incomingRefreshToken } =
      this.refreshTokenSchema.parse(req.body)

    const { accessToken, refreshToken } =
      await this.refreshTokenUseCase.execute({
        incomingRefreshToken,
      })

    res.status(200).json({
      accessToken,
      refreshToken,
    })
  }
}
