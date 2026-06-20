import express, { type Express, type Request, type Response } from 'express'
import { SignInController } from '../application/controllers/sign-in.controller.ts'
import { SignUpController } from '../application/controllers/sign-up.controller.ts'
import { SignInUseCase } from '../application/use-cases/sign-in.usecase.ts'
import { SignUpUseCase } from '../application/use-cases/sign-up.usecase.ts'
import { env } from '../shared/env.ts'
import { PrismaAccountsRepository } from './database/repositories/prisma-accounts-repository.ts'

const app: Express = express()

app.use(express.json())

app.post('/sign-up', async (req: Request, res: Response) => {
  const accountsRepository = new PrismaAccountsRepository()
  const signUpUseCase = new SignUpUseCase(accountsRepository)
  const signUpController = new SignUpController(signUpUseCase)

  const { statusCode, body } = await signUpController.handle({
    body: req.body,
  })

  res.status(statusCode).json(body)
})

app.post('/sign-in', async (req: Request, res: Response) => {
  const accountRepository = new PrismaAccountsRepository()
  const signInUseCase = new SignInUseCase(accountRepository, env.JWT_SECRET)
  const signInController = new SignInController(signInUseCase)

  const { statusCode, body } = await signInController.handle({
    body: req.body,
  })

  res.status(statusCode).json(body)
})

app.listen(env.PORT, () => {
  console.log(`🚀 Server running at http://localhost:${env.PORT}`)
})
