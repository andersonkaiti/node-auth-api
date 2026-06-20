import { ZodError, z } from 'zod'
import { AccountAlreadyExists } from '../../application/errors/account-already-exists.ts'
import type { SignUpUseCase } from '../../application/use-cases/sign-up.usecase.ts'
import type {
  IController,
  IRequest,
  IResponse,
} from '../interfaces/icontroller.ts'

const signUpSchema = z.object({
  name: z.string().min(2),
  email: z.email().min(1),
  password: z.string().min(8),
})

export class SignUpController implements IController {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { email, name, password } = signUpSchema.parse(body)

      await this.signUpUseCase.execute({
        email,
        name,
        password,
      })

      return {
        statusCode: 204,
      }
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
        }
      }

      if (error instanceof AccountAlreadyExists) {
        return {
          statusCode: 409,
          body: {
            error: 'This e-mail is already in use',
          },
        }
      }

      throw error
    }
  }
}
