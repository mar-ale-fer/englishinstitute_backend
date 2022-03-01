import { gql } from "apollo-server";

export const typeDefs = gql`
    type Query {
        courses(
            year: Float!,
            schedule: String!,
            details: String!,
            active: Boolean,
            levelId: ID!,
            debug: String!
        ) : CourseList!

        courseById(
            id: ID!,
            debug: String!
        ) : CourseCRUDResponse!
    }

    type CourseList{
        success: Boolean!
        message: String!
        courses: [Course]!
    }

    type Mutation {
        courseCreate(
            year: Float!,
            schedule: String!,
            details: String!,
            monthlyPrice: Float!,
            active: Boolean!,
            levelId: ID!,        
        ) : CourseCRUDResponse!

        courseUpdate(
            id: ID!
            year: Float!,
            schedule: String!,
            details: String!,
            monthlyPrice: Float!,
            active: Boolean!,
            levelId: ID!,
        ) : CourseCRUDResponse!

        courseDelete(
            id: ID!
        ) : CourseCRUDResponse!
    }

    type CourseCRUDResponse {
        success: Boolean!
        message: String!
        course: Course!
    }

    type Course {
        id: ID!
        year: Float!,
        schedule: String!,
        details: String!,
        monthlyPrice: Float!,
        active: Boolean,
        auditLastUser: String!,
        level: Level!    
    }
`;