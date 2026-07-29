import type { Request, Response } from 'express'
import type { IController } from '../interfaces/icontroller.ts'

export function routeAdapter(controller: IController) {
  return async (req: Request, res: Response) =>
    await controller.handle(req, res)
}
