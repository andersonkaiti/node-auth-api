import { AccountsRepository } from '@database/repositories/accounts.repository.ts'
import { env } from '@shared/env.ts'
import { SignInUseCase } from '@use-cases/sign-in.usecase.ts'

export function makeSignInUseCase() {
  const accountRepository = new AccountsRepository()

  return new SignInUseCase(accountRepository, env.JWT_SECRET)
}
