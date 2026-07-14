import { prisma } from '@database/prisma/index.ts'
import type { IAccount } from '@entities/account.entity.ts'
import type { IAccountsRepository } from '@repositories/accounts.repository.ts'

export class AccountsRepository implements IAccountsRepository {
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
