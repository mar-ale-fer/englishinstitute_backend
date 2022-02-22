import { studentType } from '../../types/studentType'
import { studentExists } from './studentUtils'
import { handleStudentError, handleStudentOk } from './handleStudentResponse'
import { tenantContext } from '../credentials/tenantContext'
import log from 'loglevel'
import { StudentError } from './studentError'
import moment from "moment";

log.setLevel(process.env.LOG_LEVEL ? process.env.LOG_LEVEL as log.LogLevelDesc : "ERROR")
export const handleStudentUpdate = async (_: any, args: any, { models, req }: { models: any, req: any }) => {
    try {

        const { userInstituteId, sessionUser } = await tenantContext(req, 'STUDENT_UPDATE')
        const dateOfBirth = moment(args.dateOfBirth, "DD/MM/YYYY", true).toDate()

        const newStudent: studentType = {
            id: args.id,
            firstName: args.firstName,
            lastName: args.lastName,
            documentNumber: args.documentNumber,
            dateOfBirth,
            phoneNumber: args.phoneNumber,
            email: args.email,
            observations: args.observations,
            auditLastUser: sessionUser?.email || '',
            InstituteId: userInstituteId
        }
        await studentExists(newStudent)
        const studentToUpdate = await models.Student.findOne({
            where: {
                id: newStudent.id,
                InstituteId: userInstituteId //tenant security check
            }
        })
        if (!studentToUpdate) throw new StudentError("No se encontró el estudiante", newStudent)
        Object.assign(studentToUpdate, newStudent)
        await studentToUpdate.save()
        return handleStudentOk('Estudiante modificado', studentToUpdate)
    } catch (e: any) {
        return handleStudentError(e)
    }
}