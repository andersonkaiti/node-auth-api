import type { SignUpUseCase } from '@use-cases/sign-up.usecase.ts'
import type { Request, Response } from 'express'
import { z } from 'zod'
import type { IController } from '../interfaces/icontroller.ts'

export class SignUpController implements IController {
  private signUpSchema = z.object({
    name: z.string().min(2),
    email: z.email().min(1),
    password: z.string().min(8),
  })

  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { email, name, password } = this.signUpSchema.parse(req.body)

    await this.signUpUseCase.execute({ email, name, password })

    res.sendStatus(204)
  }
}
