import { handleStudentError, handleStudentOk } from "./handleStudentResponse";
import { tenantContext } from "../credentials/tenantContext";
import { StudentError } from "./studentError";
import { EmptyStudent } from "../../types/studentType";
import log from 'loglevel'
log.setLevel(process.env.LOG_LEVEL ? process.env.LOG_LEVEL as log.LogLevelDesc : "ERROR")

export const handleStudentById = async (_: any, args: any, { models, req }: { models: any, req: any }) => {
    try {
        const { userInstituteId } = await tenantContext(req, 'LEVEL_BY_ID')
        const student = await models.Student.findOne({
            where: {
                id: args.id,
                InstituteId: userInstituteId //tenant security check
            }
        })
        if (!student) throw new StudentError('No se encontró el estudiante', EmptyStudent)
        return handleStudentOk('Estudiante', student)
    } catch (e: any) {
        return handleStudentError(e)
    }
}