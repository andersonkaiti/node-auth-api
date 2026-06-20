import express, { type Express } from 'express'
import { makeSignInController } from '../factories/make-sign-in-controller.factory.ts'
import { makeSignUpController } from '../factories/make-sign-up-controller.factory.ts'
import { routeAdapter } from './adapters/route-adapter.ts'
import { errorHandler } from './error-handler.ts'

export const app: Express = express()

app.use(express.json())

app.post('/sign-up', routeAdapter(makeSignUpController()))
app.post('/sign-in', routeAdapter(makeSignInController()))

app.use(errorHandler)
