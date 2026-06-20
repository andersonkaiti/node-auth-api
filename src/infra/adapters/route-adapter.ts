import type { Request, Response } from 'express'
import type { IController } from '../../application/interfaces/icontroller.ts'

export function routeAdapter(controller: IController) {
  return async (req: Request, res: Response) => {
    const { statusCode, body } = await controller.handle({
      body: req.body,
    })

    res.status(statusCode).json(body)
  }
}
