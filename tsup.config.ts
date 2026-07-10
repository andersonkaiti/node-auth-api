import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/infra/http/server.ts'],
  format: 'esm',
  minify: true,
  clean: true,
})
