import { userType } from "../types/userType"
import models from '../models'

export const insertUser = async (newUser : userType) => {
    try {
        const insert_newUser = await models.User.create(newUser)
        console.log(`userid:${insert_newUser.dataValues.id}, code:${newUser.code}`)
    } catch (error : any) {
        console.error(error)
    }
}
