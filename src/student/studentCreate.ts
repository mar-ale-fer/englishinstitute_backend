import { studentType } from "../../types/studentType";
import { handleStudentError, handleStudentOk } from "./handleStudentResponse";
import { tenantContext } from "../credentials/tenantContext";
import log from 'loglevel'
log.setLevel(process.env.LOG_LEVEL ? process.env.LOG_LEVEL as log.LogLevelDesc: "ERROR")
export const handleStudentCreate = async(_: any, args: any, { models, req}: {models: any, req: any}) => {
    try {
        const { userInstituteId, sessionUser } = await tenantContext(req, 'STUDENT_CREATE')

        const newStudent: studentType = {
            id : null,
            firstName: args.firstName,
            lastName: args.lastName,
            documentNumber: args.documentNumber,
            dateOfBirth: args.dateOfBirth,
            phoneNumber: args.phoneNumber,
            email: args.email,
            observations: args.observations,
            auditLastUser: sessionUser?.email || ''
        }
        const insertedStudent = await models.Student.create(newStudent)
        return handleStudentOk('Estudiante creado', insertedStudent)
    } catch (e : any) {
        return handleStudentError(e)
    }
}