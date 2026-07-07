import { SignUpUseCase } from '../../../application/use-cases/sign-up.usecase.ts'
import { AccountsRepository } from '../../database/repositories/accounts.repository.ts'

export function makeSignUpUseCase() {
  const accountsRepository = new AccountsRepository()

  return new SignUpUseCase(accountsRepository)
}
