const { gql } = require('apollo-server');

export const typeDefs = gql`
  type Query {
    levels(
      name: String!,
      debug: String!,
    ): levelList!

    levelById(
      id: ID!,
      debug: String!,
      ):LevelCRUDResponse!
  }

  type levelList{
    success: Boolean!
    message: String!
    levels: [Level]
  }

  type Mutation {
    levelCreate(
      name: String!
    ): LevelCRUDResponse!
    levelUpdate(
      id: ID!
      name: String!
    ): LevelCRUDResponse!
    levelDelete(
      id: ID!
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
