const { gql } = require('apollo-server');

export const typeDefs = gql`

  type Mutation {
    createInstituteWithUser(
      name: String!
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): InstituteCRUDResponse!
  }
  type InstituteCRUDResponse {
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
    id: ID!
    name: String
    active: Boolean
  }
`;
