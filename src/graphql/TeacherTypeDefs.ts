const { gql } = require('apollo-server');

export const typeDefs = gql`
  type Query {
    teachers(
      firstName: String!,
      lastName: String!,      
      debug: String!): TeacherList!
  }

  type Teacher {
    id: ID!
    firstName: String
    lastName: String
    phoneNumber: String
  }

  type TeacherList{
    success: Boolean!
    message: String!
    teachers:[Teacher]          
  }
`;
