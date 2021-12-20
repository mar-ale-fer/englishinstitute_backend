const { gql } = require('apollo-server');

export const typeDefs = gql`
  type Query {
    users(
      firstName: String!,
      lastName: String!,
      email: String!,
      password: String!,
      mustChangePassword: Boolean!,
      roles: String!
    ): userList!

    userById(
      id: ID!,
      debug: String!,
      ):UserCRUDResponse!
  }

  type userList{
    success: Boolean!
    message: String!
    users: [User]
  }

  type Mutation {
    userCreate(
      firstName: String!,
      lastName: String!,
      email: String!,
      password: String!,
      mustChangePassword: Boolean!,
      roles: String!
    ): UserCRUDResponse!
    levelUpdate(
      id: ID!
      firstName: String!,
      lastName: String!,
      email: String!,
      password: String!,
      mustChangePassword: Boolean!,
      roles: String!
    ): UserCRUDResponse!
    levelDelete(
      id: ID!
    ): UserCRUDResponse!
  }

  type UserCRUDResponse {
    success: Boolean!
    message: String!
    level: User!
  }

  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
    roles: String
  }
`;
