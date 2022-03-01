import { handleCourseCreate } from "./courseCreate";
import { handleCourseUpdate } from "./courseUpdate";
import { handleCourseDelete } from "./courseDelete";
import { handleCourses } from "./CourseQuery";
import { handleCourseById } from "./courseByIdQuery";
import { EmptyLevel } from "../../types/levelType";

export const resolvers = {
    Query: {
        courses: handleCourses,
        courseById: handleCourseById
    },
    Mutation: {
        courseCreate: handleCourseCreate,
        courseUpdate: handleCourseUpdate,
        courseDelete: handleCourseDelete
    },
    //The attribute of Course thats return the level
    Course: {
        level: async (Course: any, _: any, { models }: { models: any }) => {
            console.log(`--course.level. Course.id:${Course.id}`);

            const aCourse = await models.Course.findByPk(Course.id);
            if (!aCourse) return EmptyLevel;
            const level = await aCourse.getLevel();
            return level;
        }
    }
}
