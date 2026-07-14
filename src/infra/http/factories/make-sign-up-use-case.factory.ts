import { AccountsRepository } from '@database/repositories/accounts.repository.ts'
import { SignUpUseCase } from '@use-cases/sign-up.usecase.ts'

export function makeSignUpUseCase() {
  const accountsRepository = new AccountsRepository()

  return new SignUpUseCase(accountsRepository)
}
