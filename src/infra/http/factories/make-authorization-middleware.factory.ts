import { AuthorizationMiddleware } from '../middlewares/authorization.middleware.ts'
import { makeGetRolePermissionsUseCase } from './make-get-role-permissions-use-case.factory.ts'

export function makeAuthorizationMiddleware(requiredPermissions: string[]) {
  return new AuthorizationMiddleware(
    requiredPermissions,
    makeGetRolePermissionsUseCase(),
  )
}
