import { ListLeadsController } from '../controllers/list-leads.controller.ts'

export function makeListLeadsController() {
  return new ListLeadsController()
}
