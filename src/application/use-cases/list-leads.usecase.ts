import type { ILeadsRepository } from '@repositories/leads.repository.ts'

interface IOutput {
  leads: {
    id: string
    name: string
    email: string
  }[]
}

export class ListLeadsUseCase {
  constructor(private readonly leadsRepository: ILeadsRepository) {}

  async execute(): Promise<IOutput> {
    const leads = await this.leadsRepository.listLeads()

    return {
      leads,
    }
  }
}
