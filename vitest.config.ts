import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    globalSetup: ['./tests/global-setup.ts'],
    coverage: {
      provider: 'v8',
    },
  },
})
