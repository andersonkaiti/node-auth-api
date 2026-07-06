import { faker } from '@faker-js/faker'
import { prisma } from './index.ts'

await prisma.lead.deleteMany()

const leads = Array.from({ length: 20 }, () => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
}))

await prisma.lead.createMany({ data: leads })

await prisma.$disconnect()

console.log(`Seeded ${leads.length} leads.`)
