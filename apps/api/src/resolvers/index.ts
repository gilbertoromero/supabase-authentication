import type { Resolvers } from '../generated/graphql.js'

export const resolvers: Resolvers = {
  Query: {
    health: () => 10,
    boom: () => {
      throw new Error('SECRET internal detail: db password is hunter2')
    }
  }
}
