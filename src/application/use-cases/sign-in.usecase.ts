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
    private readonly refreshTokenSecret: string,
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

    const refreshToken = jwt.sign(payload, this.refreshTokenSecret, {
      expiresIn: '10d',
    })

    await this.refreshTokensRepository.create({
      token: refreshToken,
      accountId: account.id,
    })

    return {
      accessToken,
      refreshToken,
    }
  }
}
