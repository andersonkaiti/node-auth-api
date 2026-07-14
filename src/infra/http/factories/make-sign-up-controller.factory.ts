import { SignUpController } from '@controllers/sign-up.controller.ts'
import { makeSignUpUseCase } from '@factories/make-sign-up-use-case.factory.ts'

export function makeSignUpController() {
  const signUpUseCase = makeSignUpUseCase()

  return new SignUpController(signUpUseCase)
}
