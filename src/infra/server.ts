import express, { type Express } from 'express'
import { makeSignInController } from '../factories/make-sign-in-controller.factory.ts'
import { makeSignUpController } from '../factories/make-sign-up-controller.factory.ts'
import { env } from '../shared/env.ts'
import { routeAdapter } from './adapters/route-adapter.ts'

const app: Express = express()

app.use(express.json())

app.post('/sign-up', routeAdapter(makeSignUpController()))
app.post('/sign-in', routeAdapter(makeSignInController()))

app.listen(env.PORT, () => {
  console.log(`🚀 Server running at http://localhost:${env.PORT}`)
})
