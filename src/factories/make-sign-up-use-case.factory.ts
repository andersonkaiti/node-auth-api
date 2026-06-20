import { SignUpUseCase } from '../application/use-cases/sign-up.usecase.ts'
import { PrismaAccountsRepository } from '../infra/database/repositories/prisma-accounts-repository.ts'

export function makeSignUpUseCase() {
  const accountsRepository = new PrismaAccountsRepository()

  return new SignUpUseCase(accountsRepository)
}
