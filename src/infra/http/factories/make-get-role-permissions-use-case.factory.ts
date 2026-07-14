import { PermissionsRepository } from '@database/repositories/permissions.repository.ts'
import { GetRolePermissionsUseCase } from '@use-cases/get-role-permissions.usecase.ts'

export function makeGetRolePermissionsUseCase() {
  const permissionsRepository = new PermissionsRepository()

  return new GetRolePermissionsUseCase(permissionsRepository)
}
