import { compare } from 'bcryptjs'
import { type SignOptions, sign } from 'jsonwebtoken'
import type { IAccountsRepository } from '../../domain/repositories/accounts.ts'
import { InvalidCredentials } from '../errors/invalid-credentials.ts'

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
      throw new InvalidCredentials()
    }

    const isPasswordValid = await compare(password, account.password)

    if (!isPasswordValid) {
      throw new InvalidCredentials()
    }

    const payload = {
      sub: account.id,
    }

    const options: SignOptions = {
      expiresIn: '1d',
    }

    const accessToken = sign(payload, this.jwtSecret, options)

    return {
      accessToken,
    }
  }
}
