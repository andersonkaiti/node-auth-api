import { randomUUID } from 'node:crypto'
import type { Request, Response } from 'express'
import type { IController } from '../interfaces/icontroller.ts'

export class ListLeadsController implements IController {
  async handle(_req: Request, res: Response): Promise<void> {
    res.status(200).json({
      leads: [
        {
          id: randomUUID(),
          name: 'Zézinho',
        },
        {
          id: randomUUID(),
          name: 'Mateuszinho',
        },
        {
          id: randomUUID(),
          name: 'Carlinhos',
        },
      ],
    })
  }
}
