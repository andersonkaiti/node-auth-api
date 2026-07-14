import type { SignInUseCase } from '@use-cases/sign-in.usecase.ts'
import { z } from 'zod'
import type { IController } from '../interfaces/icontroller.ts'
import type { AppContext } from '../types/app-context.ts'

const signInSchema = z.object({
  email: z.email().min(1),
  password: z.string().min(8),
})

export class SignInController implements IController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  async handle(c: AppContext): Promise<Response> {
    const body = await c.req.json()
    const { email, password } = signInSchema.parse(body)

    const { accessToken } = await this.signInUseCase.execute({
      email,
      password,
    })

    return c.json({ accessToken }, 200)
  }
}
