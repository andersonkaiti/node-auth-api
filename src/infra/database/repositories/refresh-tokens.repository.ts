import { prisma } from '@database/prisma/index.ts'
import type { IRefreshToken } from '@entities/refresh-token.entity.ts'
import type {
  IRefreshTokensRepository,
  IRotateRefreshToken,
} from '@repositories/refresh-tokens.repository.ts'

export class RefreshTokensRepository implements IRefreshTokensRepository {
  async create({ token, accountId }: Omit<IRefreshToken, 'id'>): Promise<void> {
    await prisma.refreshToken.create({
      data: {
        token,
        accountId,
      },
    })
  }

  async rotateRefreshToken({
    incomingRefreshToken,
    newRefreshToken,
    accountId,
  }: IRotateRefreshToken): Promise<void> {
    await prisma.$transaction([
      prisma.refreshToken.create({
        data: {
          token: newRefreshToken,
          accountId,
        },
      }),
      prisma.refreshToken.deleteMany({
        where: {
          token: incomingRefreshToken,
        },
      }),
    ])
  }

  async findByToken({
    token,
  }: Pick<IRefreshToken, 'token'>): Promise<IRefreshToken | null> {
    return await prisma.refreshToken.findFirst({
      where: {
        token,
      },
    })
  }
}
