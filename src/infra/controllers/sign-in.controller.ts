import { ZodError, z } from 'zod'
import { InvalidCredentials } from '../../application/errors/invalid-credentials.ts'
import type { SignInUseCase } from '../../application/use-cases/sign-in.usecase.ts'
import type {
  IController,
  IRequest,
  IResponse,
} from '../interfaces/icontroller.ts'

const signInSchema = z.object({
  email: z.email().min(1),
  password: z.string().min(8),
})

export class SignInController implements IController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { email, password } = signInSchema.parse(body)

      const { accessToken } = await this.signInUseCase.execute({
        email,
        password,
      })

      return {
        statusCode: 200,
        body: {
          accessToken,
        },
      }
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
        }
      }

      if (error instanceof InvalidCredentials) {
        return {
          statusCode: 401,
          body: {
            error: 'Invalid credentials',
          },
        }
      }

      throw error
    }
  }
}
