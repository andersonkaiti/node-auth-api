import { prisma } from '@database/prisma/index.ts'
import type { IRefreshToken } from '@entities/refresh-token.entity.ts'
import type {
  IRefreshTokensRepository,
  IRefreshTokenWithRole,
  IRotateRefreshToken,
} from '@repositories/refresh-tokens.repository.ts'

export class RefreshTokensRepository implements IRefreshTokensRepository {
  async create({
    expiresAt,
    accountId,
  }: Omit<IRefreshToken, 'id' | 'issuedAt'>): Promise<IRefreshToken> {
    return await prisma.refreshToken.create({
      data: {
        expiresAt,
        accountId,
      },
    })
  }

  async rotateRefreshToken({
    incomingRefreshToken,
    newRefreshTokenExpiringDate,
    accountId,
  }: IRotateRefreshToken): Promise<IRefreshToken> {
    const [refreshToken] = await prisma.$transaction([
      prisma.refreshToken.create({
        data: {
          accountId,
          expiresAt: newRefreshTokenExpiringDate,
        },
      }),
      prisma.refreshToken.deleteMany({
        where: {
          id: incomingRefreshToken,
        },
      }),
    ])

    return refreshToken
  }

  async findByToken({
    id,
  }: Pick<IRefreshToken, 'id'>): Promise<IRefreshTokenWithRole | null> {
    return await prisma.refreshToken.findFirst({
      where: {
        id,
      },
      include: {
        account: {
          select: {
            role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })
  }

  async delete(id: IRefreshToken['id']): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: {
        id,
      },
    })
  }

  async deleteManyByUserId(
    accountId: IRefreshToken['accountId'],
  ): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: {
        accountId,
      },
    })
  }
}
