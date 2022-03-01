import log from 'loglevel';
import { CourseError } from './CourseError';
import { CourseType } from '../../types/courseType';
import { EmptyCourse } from "../../types/courseType";

export const handleCourseError = (e: Error) => {
    log.error(e);

    if (e instanceof CourseError) {
        return {
            success: false,
            message: `${e.message}`,
            course: e.course
        }
    }
    return {
        success: false,
        message: `${e.message}`,
        course: EmptyCourse
    }
}

export const handleCourseOk = (message: string, course: CourseType) => ({
    success: true,
    message,
    course
})