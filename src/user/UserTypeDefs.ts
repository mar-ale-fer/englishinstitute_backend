const { gql } = require('apollo-server');

export const typeDefs = gql`
  type Query {
    users(
      firstName: String!,
      lastName: String!,
      email: String!,
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
      roles: [String]!,
    ): UserCRUDResponse!
    userUpdate(
      id: ID!
      firstName: String!,
      lastName: String!,
      email: String!,
      roles: [String]!
    ): UserCRUDResponse!
    userDelete(
      id: ID!
    ): UserCRUDResponse!
    userChangePassword(
      id: ID!
      Password: String!,
    ): UserCRUDResponse!
  }

  type UserCRUDResponse {
    success: Boolean!
    message: String!
    user: User!
  }

  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
    roles: Roles
  }

  type Roles {
    roles: [String]!
  }
`;
