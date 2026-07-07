import type { IPermission } from '../../../domain/entities/permission.entity.ts'
import type { IPermissionsRepository } from '../../../domain/repositories/permissions.repository.ts'
import { prisma } from '../prisma/index.ts'

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
