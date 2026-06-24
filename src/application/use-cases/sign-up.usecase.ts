import { hash } from 'bcryptjs'
import type { IAccountsRepository } from '../../domain/repositories/accounts.ts'
import { ConflictError } from '../errors/conflict-error.ts'

interface IInputDTO {
  name: string
  email: string
  password: string
}

type IOutputDTO = void

export class SignUpUseCase {
  constructor(private readonly accountRepository: IAccountsRepository) {}

  async execute({ email, name, password }: IInputDTO): Promise<IOutputDTO> {
    const accountAlreadyExists =
      await this.accountRepository.findAccountByEmail(email)

    if (accountAlreadyExists) {
      throw new ConflictError('This e-mail is already in use')
    }

    const hashedPassword = await hash(password, 8)

    await this.accountRepository.createAccount({
      email,
      name,
      password: hashedPassword,
      role: 'USER',
    })
  }
}
