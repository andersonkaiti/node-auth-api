import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/infra/http/lambda.ts'],
  format: 'esm',
  minify: true,
  clean: true,
})
