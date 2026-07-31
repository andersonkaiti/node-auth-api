import { Unauthorized } from '@errors/unauthorized.error.ts'
import type { IAccountsRepository } from '@repositories/accounts.repository.ts'
import type { IRefreshTokensRepository } from '@repositories/refresh-tokens.repository.ts'
import { compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'

interface IInput {
  email: string
  password: string
}

interface IOutput {
  accessToken: string
  refreshToken: string
}

export class SignInUseCase {
  constructor(
    private readonly accountsRepository: IAccountsRepository,
    private readonly refreshTokensRepository: IRefreshTokensRepository,
    private readonly jwtSecret: string,
  ) {}

  async execute({ email, password }: IInput): Promise<IOutput> {
    const account = await this.accountsRepository.findAccountByEmail(email)

    if (!account) {
      throw new Unauthorized('Invalid credentials')
    }

    const isPasswordValid = await compare(password, account.password)

    if (!isPasswordValid) {
      throw new Unauthorized('Invalid credentials')
    }

    const payload = {
      sub: account.id,
      role: account.roleId,
    }

    const accessToken = jwt.sign(payload, this.jwtSecret, {
      expiresIn: '15s',
    })

    const expiresAt = new Date()
    const EXPIRATION_TIME_IN_DAYS = 10
    expiresAt.setDate(expiresAt.getDate() + EXPIRATION_TIME_IN_DAYS)

    const { id: refreshToken } = await this.refreshTokensRepository.create({
      accountId: account.id,
      expiresAt,
    })

    return {
      accessToken,
      refreshToken,
    }
  }
}
