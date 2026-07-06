import type { ILead } from '../../../domain/entities/lead.ts'
import type { ILeadsRepository } from '../../../domain/repositories/leads.ts'
import { prisma } from '../prisma/index.ts'

export class PrismaLeadsRepository implements ILeadsRepository {
  async listLeads(): Promise<ILead[]> {
    return await prisma.lead.findMany()
  }

  async findLeadByEmail(email: string): Promise<ILead | null> {
    return await prisma.lead.findUnique({
      where: {
        email,
      },
    })
  }

  async createLead(lead: Omit<ILead, 'id'>): Promise<void> {
    await prisma.lead.create({
      data: lead,
    })
  }
}
