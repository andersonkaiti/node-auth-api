import { SignUpController } from '../infra/controllers/sign-up.controller.ts'
import { makeSignUpUseCase } from './make-sign-up-use-case.factory.ts'

export function makeSignUpController() {
  const signUpUseCase = makeSignUpUseCase()

  return new SignUpController(signUpUseCase)
}
