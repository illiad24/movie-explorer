import { createSchema } from 'graphql-yoga';
import { searchMulti } from './tmdb/tmdbService.js';
import type { Resolvers } from './generated/resolvers.js';

export const schema = createSchema({
  typeDefs:`
    type MediaItem {
      id: ID!
      title: String!
      posterUrl: String
      releaseYear: String
      rating: Float
      type: String!
    }

    type Query {
      healthCheck: String!
      search(query: String!): [MediaItem!]!
    }
  `,
  resolvers: {
    Query: {
      healthCheck: () => 'ok',
      search: (_parent, args) => searchMulti(args.query),
    },
  } satisfies Resolvers,
});
