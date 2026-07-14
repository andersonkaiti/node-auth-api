import { ListLeadsController } from '@controllers/list-leads.controller.ts'
import { makeListLeadsUseCase } from '@factories/make-list-leads-use-case.factory.ts'

export function makeListLeadsController() {
  return new ListLeadsController(makeListLeadsUseCase())
}
