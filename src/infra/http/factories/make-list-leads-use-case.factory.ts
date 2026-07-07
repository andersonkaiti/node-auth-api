import { ListLeadsUseCase } from '../../../application/use-cases/list-leads.usecase.ts'
import { LeadsRepository } from '../../database/repositories/leads.repository.ts'

export function makeListLeadsUseCase() {
  const leadsRepository = new LeadsRepository()

  return new ListLeadsUseCase(leadsRepository)
}
