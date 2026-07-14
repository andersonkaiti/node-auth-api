import { makeGetRolePermissionsUseCase } from '@factories/make-get-role-permissions-use-case.factory.ts'
import { AuthorizationMiddleware } from '@middlewares/authorization.middleware.ts'

export function makeAuthorizationMiddleware(requiredPermissions: string[]) {
  return new AuthorizationMiddleware(
    requiredPermissions,
    makeGetRolePermissionsUseCase(),
  )
}
