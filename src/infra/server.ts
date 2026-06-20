import express, { type Express, type Request, type Response } from 'express'
import { SignUpController } from '../application/controllers/sign-up.controller.ts'
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

app.listen(env.PORT, () => {
  console.log(`🚀 Server running at http://localhost:${env.PORT}`)
})
