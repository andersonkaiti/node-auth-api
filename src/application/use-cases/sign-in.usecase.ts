import { compare } from 'bcryptjs'
import jwt, { type SignOptions } from 'jsonwebtoken'
import type { IAccountsRepository } from '../../domain/repositories/accounts.ts'
import { Unauthorized } from '../errors/unauthorized-error.ts'

interface IInput {
  email: string
  password: string
}

interface IOutput {
  accessToken: string
}

export class SignInUseCase {
  constructor(
    private readonly accountRepository: IAccountsRepository,
    private readonly jwtSecret: string,
  ) {}

  async execute({ email, password }: IInput): Promise<IOutput> {
    const account = await this.accountRepository.findAccountByEmail(email)

    if (!account) {
      throw new Unauthorized('Invalid credentials')
    }

    const isPasswordValid = await compare(password, account.password)

    if (!isPasswordValid) {
      throw new Unauthorized('Invalid credentials')
    }

    const payload = {
      sub: account.id,
      role: account.role,
    }

    const options: SignOptions = {
      expiresIn: '1d',
    }

    const accessToken = jwt.sign(payload, this.jwtSecret, options)

    return {
      accessToken,
    }
  }
}
