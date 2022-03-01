import { CourseType } from "../../types/courseType";
import { handleCourseError, handleCourseOk } from "./handleCourseResponse";
import { tenantContext } from '../credentials/tenantContext';
import log from 'loglevel';
import { CourseError } from "./CourseError";

log.setLevel(process.env.LOG_LEVEL ? process.env.LOG_LEVEL as log.LogLevelDesc : "ERROR")

export const handleCourseUpdate = async (_: any, args: any, { models, req }: { models: any, req: any }) => {
    try {

        const { userInstituteId, sessionUser } = await tenantContext(req, 'USER_UPDATE')

        const newCourse: CourseType = {
            id: args.id,
            year: args.year,
            schedule: args.schedule,
            details: args.details,
            monthlyPrice: args.monthlyPrice,
            active: args.active,
            LevelId: args.levelId,
            auditLastUser: sessionUser?.email || '',
            InstituteId: userInstituteId
        }

        let courseToUpdate = await models.Course.findByPk(args.id);
        if (!courseToUpdate) throw new CourseError("No se encontró el curso", newCourse);
        if (courseToUpdate.InstituteId !== userInstituteId) //tenant security filter
            throw new CourseError("No está autorizado a modificar este curso", newCourse);

        Object.assign(courseToUpdate, newCourse);
        await courseToUpdate.save();
        return handleCourseOk('Curso modificado', courseToUpdate);
    } catch (e: any) {
        return handleCourseError(e);
    }
}