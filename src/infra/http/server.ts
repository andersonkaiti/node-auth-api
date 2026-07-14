import { serve } from '@hono/node-server'
import { env } from '@shared/env.ts'
import { app } from './app.ts'

serve({ fetch: app.fetch, port: env.PORT }, (info) => {
  console.log(`🚀 Server running at http://localhost:${info.port}`)
})
