import { Unauthorized } from '@errors/unauthorized.error.ts'
import type { IRefreshTokensRepository } from '@repositories/refresh-tokens.repository.ts'
import jwt, { type JwtPayload } from 'jsonwebtoken'

interface IInput {
  incomingRefreshToken: string
}

interface IOutput {
  accessToken: string
  refreshToken: string
}

export class RefreshTokenUseCase {
  constructor(
    private readonly refreshTokensRepository: IRefreshTokensRepository,
    private readonly jwtSecret: string,
  ) {}

  async execute({ incomingRefreshToken }: IInput): Promise<IOutput> {
    const refreshToken = await this.refreshTokensRepository.findByToken({
      id: incomingRefreshToken,
    })

    if (!refreshToken) {
      throw new Unauthorized('Invalid refresh token')
    }

    const NOW = Date.now()
    const REFRESH_TOKEN_EXPIRATION_DATE = refreshToken.expiresAt.getTime()

    if (NOW > REFRESH_TOKEN_EXPIRATION_DATE) {
      await this.refreshTokensRepository.delete(refreshToken.id)

      throw new Unauthorized('Expired refresh token')
    }

    const payload: JwtPayload = {
      sub: refreshToken.accountId,
      role: refreshToken?.account.role.name,
    }

    const accessToken = jwt.sign(payload, this.jwtSecret, {
      expiresIn: '15s',
    })

    const expiresAt = new Date()
    const EXPIRATION_TIME_IN_DAYS = 10
    expiresAt.setDate(expiresAt.getDate() + EXPIRATION_TIME_IN_DAYS)

    const { id: newRefreshToken } =
      await this.refreshTokensRepository.rotateRefreshToken({
        incomingRefreshToken,
        newRefreshTokenExpiringDate: expiresAt,
        accountId: refreshToken.accountId,
      })

    return {
      accessToken,
      refreshToken: newRefreshToken,
    }
  }
}
