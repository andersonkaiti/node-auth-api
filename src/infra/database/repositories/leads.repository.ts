import { prisma } from '@database/prisma/index.ts'
import type { ILead } from '@entities/lead.entity.ts'
import type { ILeadsRepository } from '@repositories/leads.repository.ts'

export class LeadsRepository implements ILeadsRepository {
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
