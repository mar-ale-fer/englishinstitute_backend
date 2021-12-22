import { handleUserError, handleUserOk } from './handleUserResponse'
import { tenantContext } from '../credentials/tenantContext'
import { UserError } from './userError'
import { EmptyUser } from '../../types/userType'
import log from 'loglevel'
log.setLevel(process.env.LOG_LEVEL ? process.env.LOG_LEVEL as log.LogLevelDesc: "ERROR")

export const handleUserById = async(_: any, args: any, { models, req}: {models: any, req: any}) => {
    try {
        const { userInstituteId  } = await tenantContext(req,'USER_BY_ID')
        const user = await models.User.findOne({
            where : {
                id : args.id,
                InstituteId : userInstituteId //tenant security check
            }
        })
        if (!user) throw new UserError('No se encontró el usuario', EmptyUser)
        return handleUserOk('Nivel', user)
    } catch (e : any) {
        return handleUserError(e)
    }
}