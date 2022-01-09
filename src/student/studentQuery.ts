import { handleStudentError } from "./handleStudentResponse";
import { tenantContext } from "../credentials/tenantContext";
import { studentType } from "../../types/studentType";
import { Op } from 'sequelize'
import log from 'loglevel'
import { userType } from "../../types/userType";
import { handleUserError } from "../user/handleUserResponse";
log.setLevel(process.env.lOG_LEVEL ? process.env.LOG_LEVEL as log.LogLevelDesc: "ERROR")

export const handleStudents = async(_:any, args: any, { models, req}: {models: any, req: any}) => {
    //filters from the user
    let where: any = {}
    if (args.firstName && args.firstName !== "") {where.firstName = {[Op.iLike]: args.firstName+'%'}}
    if (args.lastName && args.lastName !== "") {where.lastName = {[Op.iLike]: args.lastName+'%'}}
    if (args.documentNumber && args.documentNumber !== "") {where.documentNumber = {[Op.iLike]: args.documentNumber+'%'}}
    if (args.phoneNumber && args.phoneNumber !== "") {where.phoneNumber = {[Op.iLike]: args.phoneNumber+'%'}}
    if (args.email && args.lastName !== "") {where.email = {[Op.iLike]: args.email+'%'}}
    if (args.observations && args.observations !== "") {where.observations = {[Op.iLike]: args.observations+'%'}}

    try {
        const { userInstituteId } = await tenantContext(req, 'USERS')
        where.userInstituteId = userInstituteId //tenant security filter
        
        const users : studentType[] = models.Student.findAll({
            limit: 100,
            where,
            order: [
                ['name','asc']
            ]
        })

        return {
            success: true,
            message: 'Listado de usuarios',
            users
        }
    } catch (e : any) {
        return handleUserError(e)
    }
}