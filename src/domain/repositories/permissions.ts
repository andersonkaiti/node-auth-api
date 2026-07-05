import type { IPermission } from '../entities/permission.ts'

export interface IPermissionsRepository {
  findPermissionsByRoleId(
    roleId: string,
  ): Promise<Pick<IPermission, 'permissionCode'>[]>
}
