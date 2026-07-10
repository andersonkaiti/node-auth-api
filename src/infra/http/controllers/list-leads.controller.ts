import type { ListLeadsUseCase } from '../../../application/use-cases/list-leads.usecase.ts'
import type { IController } from '../interfaces/icontroller.ts'
import type { AppContext } from '../types/app-context.ts'

export class ListLeadsController implements IController {
  constructor(private readonly listLeadsUseCase: ListLeadsUseCase) {}

  async handle(c: AppContext): Promise<Response> {
    const leads = await this.listLeadsUseCase.execute()

    return c.json(leads, 200)
  }
}
