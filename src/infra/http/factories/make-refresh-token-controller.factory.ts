import { RefreshTokenController } from '@controllers/refresh-token.controller.ts'
import { makeRefreshTokenUseCase } from './make-refresh-token-use-case.factory.ts'

export function makeRefreshTokenController() {
  const refreshTokenUseCase = makeRefreshTokenUseCase()

  return new RefreshTokenController(refreshTokenUseCase)
}
