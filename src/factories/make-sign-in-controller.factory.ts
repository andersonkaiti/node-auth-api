import { SignInController } from '../infra/controllers/sign-in.controller.ts'
import { makeSignInUseCase } from './make-sign-in-use-case.factory.ts'

export function makeSignInController() {
  const signInUseCase = makeSignInUseCase()

  return new SignInController(signInUseCase)
}
