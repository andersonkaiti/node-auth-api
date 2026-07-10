import type { Next } from 'hono'
import type { GetRolePermissionsUseCase } from '../../../application/use-cases/get-role-permissions.usecase.ts'
import type { IMiddleware } from '../interfaces/imiddleware.ts'
import type { AppContext } from '../types/app-context.ts'

export class AuthorizationMiddleware implements IMiddleware {
  constructor(
    private readonly requiredPermissions: string[],
    private readonly getRolePermissionsUseCase: GetRolePermissionsUseCase,
  ) {}

  async handle(c: AppContext, next: Next): Promise<Response | void> {
    const account = c.get('account')

    if (!account) {
      return c.json({ error: 'Access denied' }, 403)
    }

    const { permissionCodes } = await this.getRolePermissionsUseCase.execute({
      roleId: account.role,
    })

    const isAllowed = this.requiredPermissions.some((code) =>
      permissionCodes.includes(code),
    )

    if (!isAllowed) {
      return c.json({ error: 'Access denied' }, 403)
    }

    await next()
  }
}
