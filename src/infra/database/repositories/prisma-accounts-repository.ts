import type { IAccount } from '../../../domain/entities/account.ts'
import type { IAccountsRepository } from '../../../domain/repositories/accounts.ts'
import { prisma } from '../prisma/index.ts'

export class PrismaAccountsRepository implements IAccountsRepository {
  async findAccountByEmail(email: string): Promise<IAccount | null> {
    return await prisma.account.findUnique({
      where: {
        email,
      },
    })
  }

  async createAccount({
    email,
    name,
    password,
    roleId,
  }: Omit<IAccount, 'id'>): Promise<void> {
    await prisma.account.create({
      data: {
        email,
        name,
        password,
        roleId,
      },
    })
  }
}
