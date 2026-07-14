import { AuthenticationMiddleware } from '@middlewares/authentication.middleware.ts'

export function makeAuthenticationMiddleware() {
  return new AuthenticationMiddleware()
}
