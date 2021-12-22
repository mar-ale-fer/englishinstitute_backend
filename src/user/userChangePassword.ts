import { userType} from '../../types/userType'
import { handleUserError, handleUserOk } from './handleUserResponse'
import { tenantContext } from '../credentials/tenantContext'
import { UserError } from './userError'
import { EmptyUser } from '../../types/userType'
import log from 'loglevel'
log.setLevel(process.env.LOG_LEVEL ? process.env.LOG_LEVEL as log.LogLevelDesc: "ERROR")

export const handleUserChangePassword = async(_: any, args: any, { models, req}: {models: any, req: any}) => {
    try {
        const { userInstituteId  } = await tenantContext(req,'USER_DELETE')

        const userToUpdate = await models.User.findOne({
            where : {
                id : args.id,
                InstituteId : userInstituteId //tenant security check
            }
        })
        if (!userToUpdate) throw new UserError("No se encontró el usuario", EmptyUser)
        userToUpdate.password = args.password
        userToUpdate.mustChangePassword = true
        return handleUserOk('Password modificado', userToUpdate)

    } catch (e : any) {
        return handleUserError(e)
    }
}