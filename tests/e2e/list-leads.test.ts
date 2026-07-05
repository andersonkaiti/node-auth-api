import { faker } from '@faker-js/faker'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '../../src/infra/database/prisma/index.ts'
import { app } from '../../src/infra/http/app.ts'

let accessToken: string

beforeAll(async () => {
  const userRole = await prisma.role.findFirst({ where: { name: 'USER' } })
  const email = faker.internet.email()
  const password = faker.internet.password({ length: 8 })

  await request(app).post('/sign-up').send({
    name: faker.person.fullName(),
    email,
    password,
    roleId: userRole!.id,
  })

  const response = await request(app).post('/sign-in').send({ email, password })
  accessToken = response.body.accessToken
})

afterAll(async () => {
  await prisma.account.deleteMany()
})

describe('List Leads tests', () => {
  it('should return leads when a valid token is provided', async () => {
    const response = await request(app)
      .get('/leads')
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('leads')
    expect(Array.isArray(response.body.leads)).toBe(true)
  })

  it('should return 401 when Authorization header is missing', async () => {
    const response = await request(app).get('/leads')

    expect(response.statusCode).toBe(401)
    expect(response.body).toEqual({ error: 'Invalid access token' })
  })

  it('should return 401 when prefix is not Bearer', async () => {
    const response = await request(app)
      .get('/leads')
      .set('Authorization', `Token ${accessToken}`)

    expect(response.statusCode).toBe(401)
    expect(response.body).toEqual({ error: 'Invalid access token' })
  })

  it('should return 401 when token is invalid', async () => {
    const response = await request(app)
      .get('/leads')
      .set('Authorization', 'Bearer invalid.token.value')

    expect(response.statusCode).toBe(401)
    expect(response.body).toEqual({ error: 'Invalid access token' })
  })
})
