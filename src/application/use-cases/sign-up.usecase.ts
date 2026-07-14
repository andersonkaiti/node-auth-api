import { ConflictError } from '@errors/conflict.error.ts'
import type { IAccountsRepository } from '@repositories/accounts.repository.ts'
import { hash } from 'bcryptjs'

interface IInputDTO {
  name: string
  email: string
  password: string
  roleId: string
}

type IOutputDTO = void

export class SignUpUseCase {
  constructor(private readonly accountsRepository: IAccountsRepository) {}

  async execute({
    email,
    name,
    password,
    roleId,
  }: IInputDTO): Promise<IOutputDTO> {
    const accountAlreadyExists =
      await this.accountsRepository.findAccountByEmail(email)

    if (accountAlreadyExists) {
      throw new ConflictError('This e-mail is already in use')
    }

    const hashedPassword = await hash(password, 8)

    await this.accountsRepository.createAccount({
      email,
      name,
      password: hashedPassword,
      roleId,
    })
  }
}
