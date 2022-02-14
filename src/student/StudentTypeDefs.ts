import { gql } from 'apollo-server';

export const typeDefs = gql`
    scalar Date

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

    type Mutation {
        studentCreate(
            firstName: String!
            lastName: String!
            documentNumber: String!
            dateOfBirth: Date!
            phoneNumber: String!
            email: String!
            observations: String!
        ): StudentCRUDResponse!
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