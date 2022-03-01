import { CourseType } from "../../types/courseType";
export class CourseError extends Error {
    course: CourseType
    constructor(message: string, course: CourseType) {
        super();
        this.message = message;
        this.course = course;
    }
}