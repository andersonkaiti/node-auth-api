import { SignInUseCase } from '../../../application/use-cases/sign-in.usecase.ts'
import { env } from '../../../shared/env.ts'
import { PrismaAccountsRepository } from '../../database/repositories/prisma-accounts-repository.ts'

export function makeSignInUseCase() {
  const accountRepository = new PrismaAccountsRepository()

  return new SignInUseCase(accountRepository, env.JWT_SECRET)
}
