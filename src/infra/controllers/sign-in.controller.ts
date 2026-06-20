import type { Request, Response } from 'express'
import { z } from 'zod'
import type { SignInUseCase } from '../../application/use-cases/sign-in.usecase.ts'
import type { IController } from '../interfaces/icontroller.ts'

const signInSchema = z.object({
  email: z.email().min(1),
  password: z.string().min(8),
})

export class SignInController implements IController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { email, password } = signInSchema.parse(req.body)

    const { accessToken } = await this.signInUseCase.execute({
      email,
      password,
    })

    res.status(200).json({
      accessToken,
    })
  }
}
