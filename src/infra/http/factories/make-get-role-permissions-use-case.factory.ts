import { GetRolePermissionsUseCase } from '../../../application/use-cases/get-role-permissions.usecase.ts'
import { PrismaPermissionsRepository } from '../../database/repositories/prisma-permissions-repository.ts'

export function makeGetRolePermissionsUseCase() {
  const permissionsRepository = new PrismaPermissionsRepository()

  return new GetRolePermissionsUseCase(permissionsRepository)
}
