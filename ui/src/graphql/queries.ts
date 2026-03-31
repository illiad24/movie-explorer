import { gql } from '../generated/gql';

export const SEARCH_QUERY = gql(`
  query Search($query: String!) {
    search(query: $query) {
      id
      title
      posterUrl
      releaseYear
      rating
      type
    }
  }
`);
