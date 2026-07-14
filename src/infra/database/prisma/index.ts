import { PrismaClient } from '@database/generated/prisma/client.ts'
import { PrismaPg } from '@prisma/adapter-pg'
import { env } from '@shared/env.ts'

const url = new URL(env.DATABASE_URL)
const schema = url.searchParams.get('schema') ?? 'public'

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL }, { schema })
const prisma = new PrismaClient({ adapter })

export { prisma }
