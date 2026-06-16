import { PrismaPg } from '@prisma/adapter-pg'
import { env } from '../../../shared/env.ts'
import { PrismaClient } from '../generated/prisma/client.ts'

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

export { prisma }
