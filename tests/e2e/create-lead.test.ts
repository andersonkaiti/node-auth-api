import { faker } from '@faker-js/faker'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '../../src/infra/database/prisma/index.ts'
import { app } from '../../src/infra/http/app.ts'

let adminAccessToken: string
let userAccessToken: string

beforeAll(async () => {
  const password = faker.internet.password({ length: 8 })
  const hashedPassword = await hash(password, 8)

  const adminEmail = faker.internet.email()
  const adminRole = await prisma.role.findFirst({ where: { name: 'ADMIN' } })

  await prisma.account.create({
    data: {
      name: faker.person.fullName(),
      email: adminEmail,
      password: hashedPassword,
      roleId: adminRole!.id,
    },
  })

  const adminSignIn = await request(app)
    .post('/sign-in')
    .send({ email: adminEmail, password })

  adminAccessToken = adminSignIn.body.accessToken

  const userRole = await prisma.role.findFirst({ where: { name: 'USER' } })
  const userEmail = faker.internet.email()

  await request(app).post('/sign-up').send({
    name: faker.person.fullName(),
    email: userEmail,
    password,
    roleId: userRole!.id,
  })

  const userSignIn = await request(app)
    .post('/sign-in')
    .send({ email: userEmail, password })

  userAccessToken = userSignIn.body.accessToken
})

afterAll(async () => {
  await prisma.account.deleteMany()
})

describe('Create Lead tests', () => {
  it('should return 201 when authenticated as ADMIN', async () => {
    const response = await request(app)
      .post('/leads')
      .set('Authorization', `Bearer ${adminAccessToken}`)

    expect(response.statusCode).toBe(201)
  })

  it('should return 403 when authenticated as USER', async () => {
    const response = await request(app)
      .post('/leads')
      .set('Authorization', `Bearer ${userAccessToken}`)

    expect(response.statusCode).toBe(403)
    expect(response.body).toEqual({ error: 'Access denied' })
  })

  it('should return 401 when Authorization header is missing', async () => {
    const response = await request(app).post('/leads')

    expect(response.statusCode).toBe(401)
    expect(response.body).toEqual({ error: 'Invalid access token' })
  })

  it('should return 401 when prefix is not Bearer', async () => {
    const response = await request(app)
      .post('/leads')
      .set('Authorization', `Token ${adminAccessToken}`)

    expect(response.statusCode).toBe(401)
    expect(response.body).toEqual({ error: 'Invalid access token' })
  })

  it('should return 401 when token is invalid', async () => {
    const response = await request(app)
      .post('/leads')
      .set('Authorization', 'Bearer invalid.token.value')

    expect(response.statusCode).toBe(401)
    expect(response.body).toEqual({ error: 'Invalid access token' })
  })
})
