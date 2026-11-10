import { existsSync } from 'node:fs'
import { defineConfig } from 'prisma/config'

// Prisma 7 no longer reads .env itself. CI and fresh clones have no file,
// which is fine: `generate` needs no URL, and migrate fails with a clear error.
if (existsSync('.env')) process.loadEnvFile()

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts'
  },
  datasource: {
    url: process.env.DIRECT_URL
  }
})
