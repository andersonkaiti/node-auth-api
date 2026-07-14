import { SignInController } from '@controllers/sign-in.controller.ts'
import { makeSignInUseCase } from '@factories/make-sign-in-use-case.factory.ts'

export function makeSignInController() {
  const signInUseCase = makeSignInUseCase()

  return new SignInController(signInUseCase)
}
