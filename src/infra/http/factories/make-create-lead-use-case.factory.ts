import { CreateLeadUseCase } from '../../../application/use-cases/create-lead.usecase.ts'
import { LeadsRepository } from '../../database/repositories/leads.repository.ts'

export function makeCreateLeadUseCase() {
  const leadsRepository = new LeadsRepository()

  return new CreateLeadUseCase(leadsRepository)
}
