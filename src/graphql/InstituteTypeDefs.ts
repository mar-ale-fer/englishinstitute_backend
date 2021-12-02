const { gql } = require('apollo-server');

export const typeDefs = gql`

  type Mutation {
    createInstituteWithUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): InstituteCRUDResponse!
  }
  type UserCRUDResponse {
    success: Boolean!
    message: String!
    institute: Institute!
  }

  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
    roles: String
    institute: Institute
  }

  type Institute {
    id: Id!
    name: String
    active: Boolean
  }
`;
