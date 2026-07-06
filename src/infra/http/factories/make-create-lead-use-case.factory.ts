import { CreateLeadUseCase } from '../../../application/use-cases/create-lead.usecase.ts'
import { PrismaLeadsRepository } from '../../database/repositories/prisma-leads-repository.ts'

export function makeCreateLeadUseCase() {
  const leadsRepository = new PrismaLeadsRepository()

  return new CreateLeadUseCase(leadsRepository)
}
