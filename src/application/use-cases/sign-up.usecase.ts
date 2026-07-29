import { ConflictError } from '@errors/conflict.error.ts'
import type { IAccountsRepository } from '@repositories/accounts.repository.ts'
import type { IRolesRepository } from '@repositories/roles.repository.ts'
import { hash } from 'bcryptjs'

interface IInputDTO {
  name: string
  email: string
  password: string
}

type IOutputDTO = void

export class SignUpUseCase {
  private DEFAULT_ROLE = 'USER'

  constructor(
    private readonly accountsRepository: IAccountsRepository,
    private readonly rolesRepository: IRolesRepository,
  ) {}

  async execute({ email, name, password }: IInputDTO): Promise<IOutputDTO> {
    const accountAlreadyExists =
      await this.accountsRepository.findAccountByEmail(email)

    if (accountAlreadyExists) {
      throw new ConflictError('This e-mail is already in use')
    }

    const role = await this.rolesRepository.findRoleByName(this.DEFAULT_ROLE)

    if (!role) {
      throw new Error('Default role not found')
    }

    const hashedPassword = await hash(password, 8)

    await this.accountsRepository.createAccount({
      email,
      name,
      password: hashedPassword,
      roleId: role.id,
    })
  }
}
