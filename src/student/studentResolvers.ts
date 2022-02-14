import { handleStudents } from "./studentQuery";
import { handleStudentById } from "./studentByIdQuery";
import { handleStudentCreate } from "./studentCreate";
import { GraphQLScalarType, Kind } from 'graphql';
const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
        return (value as Date).getTime(); // Convert outgoing Date to integer for JSON
    },
    parseValue(value) {
        return new Date(value as number); // Convert incoming integer to Date
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
        }
        return null; // Invalid hard-coded value (not an integer)
    },
});

export const resolvers = {
    Date: dateScalar,
    Query: {
        students: handleStudents,
        studentById: handleStudentById

    },
    Mutation: {
        studentCreate: handleStudentCreate,
        // studentUpdate: handleStudentUpdate,
        // studentDelete: handleStudentDelete
    }
}