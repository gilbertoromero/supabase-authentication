import express, { Express } from 'express'
import { GraphQLError } from 'graphql'
import { createHandler } from 'graphql-http/lib/use/express'
import { schema } from './schema/index.js'

export function createApp(): Express {
  const app = express()

  app.get('/healthz', (_req, res) => {
    res.json({ ok: true })
  })

  app.all(
    '/graphql',
    createHandler({
      schema,
      context: () => ({ userId: null }),
      formatError: (err) => {
        const e = err as GraphQLError
        // An unexpected throw: cause exists and is not a GraphQLError.s
        if (e.cause && !(e.cause instanceof GraphQLError)) {
          console.error('[graphql] masked internal error:', e.cause)
          return new GraphQLError('Internal server error', {
            nodes: e.nodes,
            source: e.source,
            positions: e.positions,
            path: e.path
          })
        }
        // Deliberate errors (validation, and Phase 5's authorization errors)
        // are safe and stay intact.
        return e
      }
    })
  )

  return app
}
