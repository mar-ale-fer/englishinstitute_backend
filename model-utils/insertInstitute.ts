import { instituteType } from '../types/instituteType'
import models from '../models'

export const insertInstitute = async (newInstitute : instituteType): Promise<number> => {
    try {
        const insertedInstitute = await models.Institute.create(newInstitute)
        console.log(`instituteid:${insertedInstitute.dataValues.id}`)
        return insertedInstitute.dataValues.id

    } catch (error : any) {
        console.error(error)
        return 0
    }

}
