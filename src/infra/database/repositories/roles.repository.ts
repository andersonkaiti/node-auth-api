import { prisma } from '@database/prisma/index.ts'
import type { IRole } from '@entities/role.entity.ts'
import type { IRolesRepository } from '@repositories/roles.repository.ts'

export class RolesRepository implements IRolesRepository {
  async findRoleByName(name: string): Promise<IRole | null> {
    return await prisma.role.findFirst({
      where: {
        name,
      },
    })
  }
}
