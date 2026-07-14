import { prisma } from '@database/prisma/index.ts'
import type { IPermission } from '@entities/permission.entity.ts'
import type { IPermissionsRepository } from '@repositories/permissions.repository.ts'

export class PermissionsRepository implements IPermissionsRepository {
  async findPermissionsByRoleId(
    roleId: string,
  ): Promise<Pick<IPermission, 'permissionCode'>[]> {
    return await prisma.rolePermission.findMany({
      where: {
        roleId,
      },
      select: {
        permissionCode: true,
      },
    })
  }
}
