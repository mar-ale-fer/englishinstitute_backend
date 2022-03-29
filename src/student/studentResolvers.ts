import { handleStudents } from "./studentsQuery";
import { handleStudentById } from "./studentByIdQuery";
import { handleStudentCreate } from "./studentCreate";
import { handleStudentUpdate } from "./studentUpdate";
import { handleStudentDelete } from "./studentDelete";

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
        studentUpdate: handleStudentUpdate,
        studentDelete: handleStudentDelete
    },
    //The attribute of Course thats return the level
    Student: {
        courses: async (Student: any, _: any, { models }: { models: any }) => {
            console.log(`--Student.courses. Student.id:${Student.id}`);

            const aStudent = await models.Student.findByPk(Student.id);
            if (!aStudent) return [];
            const courses = await aStudent.getCourses();
            return courses;
        },
    }
}