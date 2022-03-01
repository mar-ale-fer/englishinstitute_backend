import { handleCourseError } from "./handleCourseResponse";
import { tenantContext } from '../credentials/tenantContext'
import { CourseType } from "../../types/courseType";
import { Op } from 'sequelize';
import log from 'loglevel'
log.setLevel(process.env.LOG_LEVEL ? process.env.LOG_LEVEL as log.LogLevelDesc : "ERROR")

export const handleCourses = async (_: any, args: any, { models, req }: { models: any, req: any }) => {
    const { userInstituteId } = await tenantContext(req, 'COURSES');
    console.log(`---args.active:${args.active}. args.levelId:${args.levelId}`);
    //filters from the user
    let where: any = {};
    if (args.year && args.year !== 0) { where.year = args.year };
    if (args.active !== undefined) { where.active = args.active };
    if (args.levelId && args.levelId !== "0") { where.LevelId = args.levelId };
    if (args.schedule && args.schedule !== "") { where.schedule = { [Op.iLike]: '%' + args.schedule + '%' } };
    if (args.details && args.details !== "") { where.details = { [Op.iLike]: '%' + args.details + '%' } };
    where.InstituteId = userInstituteId //tenant security filter

    try {

        const courses: CourseType[] = models.Course.findAll({
            limit: 100,
            where: where
        });

        return {
            success: true,
            message: 'Listado de cursos',
            courses
        }
    } catch (e: any) {
        return handleCourseError(e)
    }
}