import { LeadsRepository } from '@database/repositories/leads.repository.ts'
import { ListLeadsUseCase } from '@use-cases/list-leads.usecase.ts'

export function makeListLeadsUseCase() {
  const leadsRepository = new LeadsRepository()

  return new ListLeadsUseCase(leadsRepository)
}
