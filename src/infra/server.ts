import { env } from '../shared/env.ts'
import { app } from './app.ts'

app.listen(env.PORT, () => {
  console.log(`🚀 Server running at http://localhost:${env.PORT}`)
})
