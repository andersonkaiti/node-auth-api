import { SignInUseCase } from '../application/use-cases/sign-in.usecase.ts'
import { PrismaAccountsRepository } from '../infra/database/repositories/prisma-accounts-repository.ts'
import { env } from '../shared/env.ts'

export function makeSignInUseCase() {
  const accountRepository = new PrismaAccountsRepository()

  return new SignInUseCase(accountRepository, env.JWT_SECRET)
}
