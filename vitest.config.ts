import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    fileParallelism: false,
    globalSetup: ['./tests/global-setup.ts'],
    coverage: {
      provider: 'v8',
    },
  },
})
