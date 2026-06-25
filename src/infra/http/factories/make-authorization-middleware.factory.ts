import { AuthorizationMiddleware } from '../middlewares/authorization.middleware.ts'

export function makeAuthorizationMiddleware(allowedRoles: string[]) {
  return new AuthorizationMiddleware(allowedRoles)
}
