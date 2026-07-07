import { GetRolePermissionsUseCase } from '../../../application/use-cases/get-role-permissions.usecase.ts'
import { PermissionsRepository } from '../../database/repositories/permissions.repository.ts'

export function makeGetRolePermissionsUseCase() {
  const permissionsRepository = new PermissionsRepository()

  return new GetRolePermissionsUseCase(permissionsRepository)
}
