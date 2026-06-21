import { execSync } from 'node:child_process'
import { config } from 'dotenv'

export function setup() {
  config({ path: '.env' })

  process.env.DATABASE_URL = process.env.DATABASE_URL?.replace(
    'schema=public',
    'schema=test',
  )

  execSync('pnpm prisma migrate deploy')
}
