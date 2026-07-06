import type { ILead } from '../entities/lead.ts'

export interface ILeadsRepository {
  listLeads(): Promise<ILead[]>
  findLeadByEmail(email: string): Promise<ILead | null>
  createLead(lead: Omit<ILead, 'id'>): Promise<void>
}
