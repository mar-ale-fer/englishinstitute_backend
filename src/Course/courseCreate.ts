import { CourseType } from "../../types/courseType";
import { handleCourseError, handleCourseOk } from "./handleCourseResponse";
import { tenantContext } from "../credentials/tenantContext";
import log from 'loglevel';

log.setLevel(process.env.LOG_LEVEL ? process.env.LOG_LEVEL as log.LogLevelDesc : "ERROR");

export const handleCourseCreate = async (_: any, args: any, { models, req }: { models: any, req: any }) => {
    try {
        const { userInstituteId, sessionUser } = await tenantContext(req, 'COURSE_CREATE')
        console.log(`course.active:${args.active}`);
        const newCourse: CourseType = {
            id: null,
            year: args.year,
            schedule: args.schedule,
            details: args.details,
            monthlyPrice: args.monthlyPrice,
            active: args.active,
            LevelId: args.levelId,
            auditLastUser: sessionUser?.email || '',
            InstituteId: userInstituteId
        }
        const insertedCourse = await models.Course.create(newCourse)
        return handleCourseOk('Curso creado', insertedCourse)
    } catch (e: any) {
        return handleCourseError(e)
    }
}