import { handleStudentError } from "./handleStudentResponse";
import { tenantContext } from "../credentials/tenantContext";
import { studentType } from "../../types/studentType";
import { Op } from 'sequelize'
import log from 'loglevel'
log.setLevel(process.env.lOG_LEVEL ? process.env.LOG_LEVEL as log.LogLevelDesc : "ERROR")

export const handleStudents = async (_: any, args: any, { models, req }: { models: any, req: any }) => {
    //filters from the user
    let where: any = {}
    if (args.firstName && args.firstName !== "") { where.firstName = { [Op.iLike]: args.firstName + '%' } }
    if (args.lastName && args.lastName !== "") { where.lastName = { [Op.iLike]: args.lastName + '%' } }
    if (args.documentNumber && args.documentNumber !== "") { where.documentNumber = { [Op.iLike]: args.documentNumber + '%' } }
    if (args.email && args.lastName !== "") { where.email = { [Op.iLike]: args.email + '%' } }
    if (args.observations && args.observations !== "") { where.observations = { [Op.iLike]: '%' + args.observations + '%' } }

    try {
        const { userInstituteId } = await tenantContext(req, 'STUDENTS')
        where.InstituteId = userInstituteId //tenant security filter

        const students: studentType[] = models.Student.findAll({
            limit: 100,
            where,
            order: [
                ['lastName', 'asc'],
                ['firstName', 'asc'],
            ]
        })

        return {
            success: true,
            message: 'Listado de estudiantes',
            students
        }
    } catch (e: any) {
        return handleStudentError(e)
    }
}