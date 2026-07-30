import { Unauthorized } from '@errors/unauthorized.error.ts'
import type { IRefreshTokensRepository } from '@repositories/refresh-tokens.repository.ts'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

interface IInput {
  incomingRefreshToken: string
}

interface IOutput {
  accessToken: string
  refreshToken: string
}

export class RefreshTokenUseCase {
  private jwtPayloadSchema = z.object({
    sub: z.string(),
    role: z.uuid(),
  })

  constructor(
    private readonly refreshTokensRepository: IRefreshTokensRepository,
    private readonly jwtSecret: string,
    private readonly refreshTokenSecret: string,
  ) {}

  async execute({ incomingRefreshToken }: IInput): Promise<IOutput> {
    const rawPayload = jwt.verify(incomingRefreshToken, this.refreshTokenSecret)
    const {
      data: payload,
      success,
      error,
    } = this.jwtPayloadSchema.safeParse(rawPayload)

    if (!success) {
      await this.refreshTokensRepository.delete(incomingRefreshToken)

      throw new Unauthorized(error.message)
    }

    const wasRefreshTokenAlreadyUsed =
      await this.refreshTokensRepository.findByToken({
        token: incomingRefreshToken,
      })

    if (!wasRefreshTokenAlreadyUsed) {
      await this.refreshTokensRepository.deleteManyByUserId(payload.sub)

      throw new Unauthorized('Invalid refresh token')
    }

    const accessToken = jwt.sign(payload, this.jwtSecret, {
      expiresIn: '15s',
    })

    const refreshToken = jwt.sign(payload, this.refreshTokenSecret, {
      expiresIn: '10d',
    })

    await this.refreshTokensRepository.rotateRefreshToken({
      incomingRefreshToken,
      newRefreshToken: refreshToken,
      accountId: payload.sub,
    })

    return {
      accessToken,
      refreshToken,
    }
  }
}
