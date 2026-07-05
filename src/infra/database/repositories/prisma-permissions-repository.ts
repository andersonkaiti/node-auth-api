import type { IPermission } from '../../../domain/entities/permission.ts'
import type { IPermissionsRepository } from '../../../domain/repositories/permissions.ts'
import { prisma } from '../prisma/index.ts'

export class PrismaPermissionsRepository implements IPermissionsRepository {
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
