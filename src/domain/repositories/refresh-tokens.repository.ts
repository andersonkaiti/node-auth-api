import type { IRefreshToken } from '../entities/refresh-token.entity.ts'

export interface IRotateRefreshToken {
  incomingRefreshToken: IRefreshToken['token']
  accountId: IRefreshToken['accountId']
  newRefreshToken: IRefreshToken['token']
}

export interface IRefreshTokensRepository {
  create(data: Omit<IRefreshToken, 'id'>): Promise<void>
  findByToken(data: Pick<IRefreshToken, 'token'>): Promise<IRefreshToken | null>
  rotateRefreshToken(data: IRotateRefreshToken): Promise<void>
  delete(data: IRefreshToken['token']): Promise<void>
  deleteManyByUserId(accountId: IRefreshToken['accountId']): Promise<void>
}
