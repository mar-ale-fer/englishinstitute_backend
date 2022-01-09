const { gql } = require('apollo-server');

export const typeDefs = gql`
    type Query {
        students(
            firstName: String!,
            lastName: String!,
            documentNumber: String!,
            phoneNumber: String!,
            email: String!,
            observations: String!
        ) : StudentList!

        studentById(
            id: ID!,
            debug: String!,
        ) : StudentCRUDResponse!

    }

    type StudentList{
        success: Boolean!
        message: String!
        students: [Student]
    }

    type StudentCRUDResponse {
        success: Boolean!
        message: String!
        student: Student!
    }

    type Student {
        id: ID!
        firstName: String!
        lastName: String!
        documentNumber: String!
        dateOfBirth: Date!
        phoneNumber: String!
        email: String!
        observations: String!
        auditLastUser: String!
    }

`;