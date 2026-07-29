import type { CreateLeadUseCase } from '@use-cases/create-lead.usecase.ts'
import type { Request, Response } from 'express'
import { z } from 'zod'
import type { IController } from '../interfaces/icontroller.ts'

export class CreateLeadController implements IController {
  private createLeadSchema = z.object({
    name: z.string(),
    email: z.email(),
  })

  constructor(private readonly createLeadUseCase: CreateLeadUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { name, email } = this.createLeadSchema.parse(req.body)

    await this.createLeadUseCase.execute({ name, email })

    res.sendStatus(201)
  }
}
