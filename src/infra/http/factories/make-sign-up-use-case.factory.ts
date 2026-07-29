import { AccountsRepository } from '@database/repositories/accounts.repository.ts'
import { RolesRepository } from '@database/repositories/roles.repository.ts'
import { SignUpUseCase } from '@use-cases/sign-up.usecase.ts'

export function makeSignUpUseCase() {
  const accountsRepository = new AccountsRepository()
  const rolesRepository = new RolesRepository()

  return new SignUpUseCase(accountsRepository, rolesRepository)
}
