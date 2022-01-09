import log from 'loglevel'
import { StudentError } from './studentError'
import { studentType, EmptyStudent } from '../../types/studentType'
import { EmptyUser } from '../../types/userType'

export const handleStudentError = (e : Error ) => {
    log.error(e)

    if (e instanceof StudentError) {
        return {
            success : false,
            message: `${e.message}`,
            student : e.student
        }
    }
    return  {
        success : false,
        message : `${e.message}`,
        student: EmptyStudent
}}

export const handleStudentOk = (message: string, student : studentType) =>  ({
    success : true,
    message,
    student
})