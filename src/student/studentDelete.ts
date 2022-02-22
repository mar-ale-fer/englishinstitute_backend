import { handleStudentError, handleStudentOk } from './handleStudentResponse'

import { tenantContext } from '../credentials/tenantContext'
import { StudentError } from './studentError'
import { EmptyStudent } from '../../types/studentType'
import log from 'loglevel'
log.setLevel(process.env.LOG_LEVEL ? process.env.LOG_LEVEL as log.LogLevelDesc : "ERROR")

export const handleStudentDelete = async (_: any, args: any, { models, req }: { models: any, req: any }) => {
    try {
        const { userInstituteId } = await tenantContext(req, 'STUDENT_DELETE')
        const studentToDelete = await models.Student.findOne({
            where: {
                id: args.id,
                InstituteId: userInstituteId //tenant security check
            }
        })
        if (!studentToDelete) throw new StudentError('No se encontró el usuario', EmptyStudent)
        await studentToDelete.destroy()
        return handleStudentOk('Estudiante eliminado', studentToDelete)
    } catch (e: any) {
        return handleStudentError(e)
    }
}

