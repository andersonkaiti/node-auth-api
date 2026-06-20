import express, { type Express, type Request, type Response } from 'express'
import { makeSignInController } from '../factories/make-sign-in-controller.factory.ts'
import { makeSignUpController } from '../factories/make-sign-up-controller.factory.ts'
import { env } from '../shared/env.ts'

const app: Express = express()

app.use(express.json())

app.post('/sign-up', async (req: Request, res: Response) => {
  const signUpController = makeSignUpController()

  const { statusCode, body } = await signUpController.handle({
    body: req.body,
  })

  res.status(statusCode).json(body)
})

app.post('/sign-in', async (req: Request, res: Response) => {
  const signInController = makeSignInController()

  const { statusCode, body } = await signInController.handle({
    body: req.body,
  })

  res.status(statusCode).json(body)
})

app.listen(env.PORT, () => {
  console.log(`🚀 Server running at http://localhost:${env.PORT}`)
})
