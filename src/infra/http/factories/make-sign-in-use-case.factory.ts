import { AccountsRepository } from '@database/repositories/accounts.repository.ts'
import { RefreshTokensRepository } from '@infra/database/repositories/refresh-tokens.repository.ts'
import { env } from '@shared/env.ts'
import { SignInUseCase } from '@use-cases/sign-in.usecase.ts'

export function makeSignInUseCase() {
  const accountRepository = new AccountsRepository()
  const refreshTokenRepository = new RefreshTokensRepository()

  return new SignInUseCase(
    accountRepository,
    refreshTokenRepository,
    env.JWT_SECRET,
  )
}
