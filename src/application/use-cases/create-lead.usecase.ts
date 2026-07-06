import type { ILeadsRepository } from '../../domain/repositories/leads.ts'
import { ConflictError } from '../errors/conflict-error.ts'

interface IInput {
  name: string
  email: string
}

type IOutput = void

export class CreateLeadUseCase {
  constructor(private readonly leadsRepository: ILeadsRepository) {}

  async execute({ name, email }: IInput): Promise<IOutput> {
    const lead = await this.leadsRepository.findLeadByEmail(email)

    if (lead) {
      throw new ConflictError('Another lead have the same e-mail')
    }

    await this.leadsRepository.createLead({
      name,
      email,
    })
  }
}
