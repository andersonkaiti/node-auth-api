import './extend-zod.ts'

import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { createLeadSchema } from '@controllers/create-lead.controller.ts'
import { refreshTokenSchema } from '@controllers/refresh-token.controller.ts'
import { signInSchema } from '@controllers/sign-in.controller.ts'
import { signUpSchema } from '@controllers/sign-up.controller.ts'
import { z } from 'zod'

export const registry = new OpenAPIRegistry()

const bearerAuth = registry.registerComponent('securitySchemes', 'bearerAuth', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
})

const tokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
})

const leadSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.email(),
})

const listLeadsSchema = z.object({
  leads: z.array(leadSchema),
})

registry.registerPath({
  method: 'post',
  path: '/sign-up',
  tags: ['Auth'],
  summary: 'Create a new account',
  request: {
    body: {
      content: {
        'application/json': { schema: signUpSchema },
      },
    },
  },
  responses: {
    204: { description: 'Account created' },
    409: { description: 'Email already in use' },
  },
})

registry.registerPath({
  method: 'post',
  path: '/sign-in',
  tags: ['Auth'],
  summary: 'Authenticate and receive tokens',
  request: {
    body: {
      content: {
        'application/json': { schema: signInSchema },
      },
    },
  },
  responses: {
    200: {
      description: 'Authenticated',
      content: {
        'application/json': { schema: tokensSchema },
      },
    },
    401: { description: 'Invalid credentials' },
  },
})

registry.registerPath({
  method: 'post',
  path: '/refresh-token',
  tags: ['Auth'],
  summary: 'Exchange a refresh token for a new pair of tokens',
  request: {
    body: {
      content: {
        'application/json': { schema: refreshTokenSchema },
      },
    },
  },
  responses: {
    200: {
      description: 'New tokens issued',
      content: {
        'application/json': { schema: tokensSchema },
      },
    },
    401: { description: 'Invalid refresh token' },
  },
})

registry.registerPath({
  method: 'get',
  path: '/leads',
  tags: ['Leads'],
  summary: 'List all leads',
  security: [{ [bearerAuth.name]: [] }],
  responses: {
    200: {
      description: 'List of leads',
      content: {
        'application/json': { schema: listLeadsSchema },
      },
    },
    401: { description: 'Unauthorized' },
    403: { description: 'Forbidden' },
  },
})

registry.registerPath({
  method: 'post',
  path: '/leads',
  tags: ['Leads'],
  summary: 'Create a new lead',
  security: [{ [bearerAuth.name]: [] }],
  request: {
    body: {
      content: {
        'application/json': { schema: createLeadSchema },
      },
    },
  },
  responses: {
    201: { description: 'Lead created' },
    401: { description: 'Unauthorized' },
    403: { description: 'Forbidden' },
  },
})
