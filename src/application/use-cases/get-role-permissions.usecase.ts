import type { IPermissionsRepository } from '../../domain/repositories/permissions.repository.ts'

interface IInput {
  roleId: string
}

interface IOutput {
  permissionCodes: string[]
}

export class GetRolePermissionsUseCase {
  constructor(private readonly permissionsRepository: IPermissionsRepository) {}

  async execute({ roleId }: IInput): Promise<IOutput> {
    const rolePermissions =
      await this.permissionsRepository.findPermissionsByRoleId(roleId)

    return {
      permissionCodes: rolePermissions.map(
        ({ permissionCode }) => permissionCode,
      ),
    }
  }
}
