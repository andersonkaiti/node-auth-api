import { z } from 'zod'
import type { CreateLeadUseCase } from '../../../application/use-cases/create-lead.usecase.ts'
import type { IController } from '../interfaces/icontroller.ts'
import type { AppContext } from '../types/app-context.ts'

const createLeadSchema = z.object({
  name: z.string(),
  email: z.email(),
})

export class CreateLeadController implements IController {
  constructor(private readonly createLeadUseCase: CreateLeadUseCase) {}

  async handle(c: AppContext): Promise<Response> {
    const body = await c.req.json()
    const { name, email } = createLeadSchema.parse(body)

    await this.createLeadUseCase.execute({ name, email })

    return c.body(null, 201)
  }
}
