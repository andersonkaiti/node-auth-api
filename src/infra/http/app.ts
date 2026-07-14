import { makeAuthenticationMiddleware } from '@factories/make-authentication-middleware.factory.ts'
import { makeAuthorizationMiddleware } from '@factories/make-authorization-middleware.factory.ts'
import { makeCreateLeadController } from '@factories/make-create-lead-controller.factory.ts'
import { makeListLeadsController } from '@factories/make-list-leads-controller.factory.ts'
import { makeSignInController } from '@factories/make-sign-in-controller.factory.ts'
import { makeSignUpController } from '@factories/make-sign-up-controller.factory.ts'
import { Hono } from 'hono'
import { middlewareAdapter } from './adapters/middleware.adapter.ts'
import { routeAdapter } from './adapters/route.adapter.ts'
import { errorHandler } from './error-handler.ts'
import type { AppEnv } from './types/app-context.ts'

export const app = new Hono<AppEnv>()

app.get('/', (c) => c.json({ message: 'Node Auth API' }, 200))

app.post('/sign-up', routeAdapter(makeSignUpController()))
app.post('/sign-in', routeAdapter(makeSignInController()))

app.get(
  '/leads',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(['leads:read'])),
  routeAdapter(makeListLeadsController()),
)
app.post(
  '/leads',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(['leads:write'])),
  routeAdapter(makeCreateLeadController()),
)

app.onError(errorHandler)
