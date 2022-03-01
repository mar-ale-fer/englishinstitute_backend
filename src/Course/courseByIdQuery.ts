import { handleCourseError, handleCourseOk } from "./handleCourseResponse";
import { tenantContext } from '../credentials/tenantContext';
import { CourseError } from "./CourseError";
import { EmptyCourse } from "../../types/courseType";
import log from 'loglevel'
log.setLevel(process.env.LOG_LEVEL ? process.env.LOG_LEVEL as log.LogLevelDesc : "ERROR")


export const handleCourseById = async (_: any, args: any, { models, req }: { models: any, req: any }) => {
    try {
        const { userInstituteId } = await tenantContext(req, 'COURSE_BY_ID')
        const course = await models.Course.findByPk(args.id)
        if (!course) throw new CourseError('No se encontró el curso', EmptyCourse)
        const courseLevel = await course.getLevel();
        if (courseLevel.InstituteId !== userInstituteId) throw new CourseError("No está autorizado a consultar este curso", EmptyCourse) //tenant security filter

        return handleCourseOk('Curso', course)
    } catch (e: any) {
        return handleCourseError(e)
    }
}