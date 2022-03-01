import { handleCourseError, handleCourseOk } from "./handleCourseResponse";
import { tenantContext } from '../credentials/tenantContext';
import { CourseError } from "./CourseError";
import { EmptyCourse } from "../../types/courseType";
import log from 'loglevel'
log.setLevel(process.env.LOG_LEVEL ? process.env.LOG_LEVEL as log.LogLevelDesc : "ERROR")

export const handleCourseDelete = async (_: any, args: any, { models, req }: { models: any, req: any }) => {
    try {
        const { userInstituteId } = await tenantContext(req, 'COURSE_DELETE')
        const courseToDelete = await models.Course.findByPk(args.id)
        if (!courseToDelete) throw new CourseError('No se encontró el curso', EmptyCourse)
        if (courseToDelete.InstituteId !== userInstituteId) throw new CourseError("No está autorizado a eliminar este curso", EmptyCourse) //tenant security filter

        await courseToDelete.destroy()
        return handleCourseOk('Curso eliminado', courseToDelete)
    } catch (e: any) {
        return handleCourseError(e)
    }
}

