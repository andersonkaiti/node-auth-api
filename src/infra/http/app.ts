import express, { type Express } from 'express'
import { middlewareAdapter } from './adapters/middleware.adapter.ts'
import { routeAdapter } from './adapters/route.adapter.ts'
import { errorHandler } from './error-handler.ts'
import { makeAuthenticationMiddleware } from './factories/make-authentication-middleware.factory.ts'
import { makeAuthorizationMiddleware } from './factories/make-authorization-middleware.factory.ts'
import { makeCreateLeadController } from './factories/make-create-lead-controller.factory.ts'
import { makeListLeadsController } from './factories/make-list-leads-controller.factory.ts'
import { makeSignInController } from './factories/make-sign-in-controller.factory.ts'
import { makeSignUpController } from './factories/make-sign-up-controller.factory.ts'

export const app: Express = express()

app.use(express.json())

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

app.use(errorHandler)
