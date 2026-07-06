import { CreateLeadController } from '../controllers/create-lead.controller.ts'
import { makeCreateLeadUseCase } from './make-create-lead-use-case.factory.ts'

export function makeCreateLeadController() {
  return new CreateLeadController(makeCreateLeadUseCase())
}
