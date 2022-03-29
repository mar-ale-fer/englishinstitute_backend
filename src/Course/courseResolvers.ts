import { handleCourseCreate } from "./courseCreate";
import { handleCourseUpdate } from "./courseUpdate";
import { handleCourseDelete } from "./courseDelete";
import { handleCourses } from "./CourseQuery";
import { handleCourseById } from "./courseByIdQuery";
import { EmptyLevel } from "../../types/levelType";
import { handleAddStudentToCourse } from "./AddStudentToCourse";
import { handleRemoveStudentFromCourse } from "./RemoveStudentFromCourse";

export const resolvers = {
    Query: {
        courses: handleCourses,
        courseById: handleCourseById
    },
    Mutation: {
        courseCreate: handleCourseCreate,
        courseUpdate: handleCourseUpdate,
        courseDelete: handleCourseDelete,
        addStudentToCourse: handleAddStudentToCourse,
        removeStudentFromCourse: handleRemoveStudentFromCourse
    },
    //The attribute of Course thats return the level
    Course: {
        level: async (Course: any, _: any, { models }: { models: any }) => {
            console.log(`--course.level. Course.id:${Course.id}`);

            const aCourse = await models.Course.findByPk(Course.id);
            if (!aCourse) return EmptyLevel;
            const level = await aCourse.getLevel();
            return level;
        },
        students: async (Course: any, _: any, { models }: { models: any }) => {
            console.log(`--course.students. Course.id:${Course.id}`);

            const aCourse = await models.Course.findByPk(Course.id);
            if (!aCourse) return [];
            const students = await aCourse.getStudents();
            return students;
        },
    }
}
