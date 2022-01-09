import { studentType } from "../../types/studentType";
import { userType } from "../../types/userType";
export class StudentError extends Error {
    student : studentType
    constructor ( message : string, student : studentType) {
        super()
        this.message = message
        this.student = student
    }
}