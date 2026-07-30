import { env } from '@shared/env.ts'
import { RefreshTokenUseCase } from '@use-cases/refresh-token.usecase.ts'

export function makeRefreshTokenUseCase() {
  return new RefreshTokenUseCase(env.JWT_SECRET, env.REFRESH_TOKEN_SECRET)
}
