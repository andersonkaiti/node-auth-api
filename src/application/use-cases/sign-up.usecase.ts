import type { IAccountsRepository } from '../../domain/repositories/accounts.ts'
import { AccountAlreadyExists } from '../errors/account-already-exists.ts'

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
      throw new AccountAlreadyExists()
    }

    await this.accountRepository.createAccount({
      email,
      name,
      password,
    })
  }
}
