import type { SignUpUseCase } from '@use-cases/sign-up.usecase.ts'
import { z } from 'zod'
import type { IController } from '../interfaces/icontroller.ts'
import type { AppContext } from '../types/app-context.ts'

const signUpSchema = z.object({
  name: z.string().min(2),
  email: z.email().min(1),
  password: z.string().min(8),
  roleId: z.uuid(),
})

export class SignUpController implements IController {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  async handle(c: AppContext): Promise<Response> {
    const body = await c.req.json()
    const { email, name, password, roleId } = signUpSchema.parse(body)

    await this.signUpUseCase.execute({ email, name, password, roleId })

    return c.body(null, 204)
  }
}
