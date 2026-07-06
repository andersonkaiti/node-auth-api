import { ListLeadsUseCase } from '../../../application/use-cases/list-leads.usecase.ts'
import { PrismaLeadsRepository } from '../../database/repositories/prisma-leads-repository.ts'

export function makeListLeadsUseCase() {
  const leadsRepository = new PrismaLeadsRepository()

  return new ListLeadsUseCase(leadsRepository)
}
