import { ListLeadsController } from '../infra/controllers/list-leads.controller.ts'

export function makeListLeadsController() {
  return new ListLeadsController()
}
