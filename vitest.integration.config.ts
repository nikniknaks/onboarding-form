import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['**/*.integration.test.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    mockReset: false,
  },
})