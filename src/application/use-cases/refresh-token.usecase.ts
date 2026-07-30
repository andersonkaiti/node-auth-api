import jwt from 'jsonwebtoken'
import { z } from 'zod'

interface IInput {
  incomingRefreshToken: string
}

interface IOutput {
  accessToken: string
  refreshToken: string
}

export class RefreshTokenUseCase {
  private jwtPayloadSchema = z.object({
    sub: z.string(),
    role: z.uuid(),
  })

  constructor(
    private readonly jwtSecret: string,
    private readonly refreshTokenSecret: string,
  ) {}

  async execute({ incomingRefreshToken }: IInput): Promise<IOutput> {
    const rawPayload = jwt.verify(incomingRefreshToken, this.refreshTokenSecret)
    const payload = this.jwtPayloadSchema.parse(rawPayload)

    const accessToken = jwt.sign(payload, this.jwtSecret, {
      expiresIn: '15s',
    })

    const refreshToken = jwt.sign(payload, this.refreshTokenSecret, {
      expiresIn: '10d',
    })

    return {
      accessToken,
      refreshToken,
    }
  }
}
