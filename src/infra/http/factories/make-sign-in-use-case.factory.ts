import { SignInUseCase } from '../../../application/use-cases/sign-in.usecase.ts'
import { env } from '../../../shared/env.ts'
import { AccountsRepository } from '../../database/repositories/accounts.repository.ts'

export function makeSignInUseCase() {
  const accountRepository = new AccountsRepository()

  return new SignInUseCase(accountRepository, env.JWT_SECRET)
}
