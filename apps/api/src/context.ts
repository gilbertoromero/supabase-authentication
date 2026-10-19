export interface GraphQLContext {
  /** Populated in Phase 4 by the authenticate() middleware. */
  userId: string | null
}
