import type { IController } from '../interfaces/icontroller.ts'
import type { AppContext } from '../types/app-context.ts'

export function routeAdapter(controller: IController) {
  return (c: AppContext) => controller.handle(c)
}
