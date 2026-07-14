import { LeadsRepository } from '@database/repositories/leads.repository.ts'
import { CreateLeadUseCase } from '@use-cases/create-lead.usecase.ts'

export function makeCreateLeadUseCase() {
  const leadsRepository = new LeadsRepository()

  return new CreateLeadUseCase(leadsRepository)
}
