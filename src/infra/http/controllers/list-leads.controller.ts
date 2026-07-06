import type { Request, Response } from 'express'
import type { ListLeadsUseCase } from '../../../application/use-cases/list-leads.usecase.ts'
import type { IController } from '../interfaces/icontroller.ts'

export class ListLeadsController implements IController {
  constructor(private readonly listLeadsUseCase: ListLeadsUseCase) {}

  async handle(_req: Request, res: Response): Promise<void> {
    const leads = await this.listLeadsUseCase.execute()

    res.status(200).json(leads)
  }
}
