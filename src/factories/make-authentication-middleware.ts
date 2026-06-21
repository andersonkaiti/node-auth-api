import { AuthenticationMiddleware } from '../infra/middlewares/authentication.middleware.ts'

export function makeAuthenticationMiddleware() {
  return new AuthenticationMiddleware()
}
