import type { Context } from 'hono'

export type AppVariables = {
  account: {
    accountId: string
    role: string
  }
}

export type AppEnv = { Variables: AppVariables }
export type AppContext = Context<AppEnv>
