const { gql } = require('apollo-server');

export const typeDefs = gql`

  type Mutation {
    levelCreate(
      name: String!
    ): LevelCRUDResponse!
    levelUpdate(
      id: ID!
      name: String!
    ): LevelCRUDResponse!
  }
  type LevelCRUDResponse {
    success: Boolean!
    message: String!
    level: Level!
  }

  type Level {
    id: ID! 
    name: String
  }
`;
