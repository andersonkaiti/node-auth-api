import type { Request, Response } from 'express'
import { z } from 'zod'
import type { SignUpUseCase } from '../../application/use-cases/sign-up.usecase.ts'
import type { IController } from '../interfaces/icontroller.ts'

const signUpSchema = z.object({
  name: z.string().min(2),
  email: z.email().min(1),
  password: z.string().min(8),
})

export class SignUpController implements IController {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { email, name, password } = signUpSchema.parse(req.body)

    await this.signUpUseCase.execute({
      email,
      name,
      password,
    })

    res.status(204).send()
  }
}
