import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { resolvers } from '../resolvers/index.js'

const typeDefs = readFileSync(
  fileURLToPath(new URL('./schema.graphql', import.meta.url)),
  'utf8'
)

export const schema = makeExecutableSchema({ typeDefs, resolvers })
