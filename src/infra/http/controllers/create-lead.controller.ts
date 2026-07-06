import type { Request, Response } from 'express'
import { z } from 'zod'
import type { CreateLeadUseCase } from '../../../application/use-cases/create-lead.usecase.ts'
import type { IController } from '../interfaces/icontroller.ts'

const createLeadSchema = z.object({
  name: z.string(),
  email: z.email(),
})

export class CreateLeadController implements IController {
  constructor(private readonly createLeadUseCase: CreateLeadUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { name, email } = createLeadSchema.parse(req.body)

    await this.createLeadUseCase.execute({
      name,
      email,
    })

    res.sendStatus(201)
  }
}
