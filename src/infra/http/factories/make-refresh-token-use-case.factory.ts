import { RefreshTokensRepository } from '@infra/database/repositories/refresh-tokens.repository.ts'
import { env } from '@shared/env.ts'
import { RefreshTokenUseCase } from '@use-cases/refresh-token.usecase.ts'

export function makeRefreshTokenUseCase() {
  const refreshTokenRepository = new RefreshTokensRepository()

  return new RefreshTokenUseCase(refreshTokenRepository, env.JWT_SECRET)
}
