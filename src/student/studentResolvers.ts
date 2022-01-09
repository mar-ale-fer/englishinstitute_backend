import { handleStudents } from "./studentQuery";
import { handleStudentById } from "./studentByIdQuery";
import { handleStudentCreate } from "./studentCreate";
export const resolvers = {
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