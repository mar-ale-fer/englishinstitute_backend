import { userType} from '../../types/userType'
import { userExists } from './userUtils'
import { handleUserError, handleUserOk } from './handleUserResponse'
import { tenantContext } from '../credentials/tenantContext'
import log from 'loglevel'
import { UserError } from './userError'

log.setLevel(process.env.LOG_LEVEL ? process.env.LOG_LEVEL as log.LogLevelDesc: "ERROR")
export const handleUserUpdate = async(_: any, args: any, { models, req}: {models: any, req: any}) => {
    try {
        
        const { userInstituteId  } = await tenantContext(req, 'USER_UPDATE')

        const newUser : userType = {
            id: args.id,
            firstName : args.firstName,
            lastName: args.lastName,
            email: (args.email  as string).toLowerCase(),
            roles: {roles:args.roles},
            InstituteId : userInstituteId
          }
        await userExists(newUser)
        const userToUpdate = await models.User.findOne({
            where : {
                id : newUser.id,
                InstituteId : userInstituteId //tenant security check
            }
        })
        if (!userToUpdate) throw new UserError("No se encontró el usuario", newUser)
        Object.assign(userToUpdate, newUser)
        await userToUpdate.save()
        return handleUserOk('Usuario modificado', userToUpdate)
    } catch (e : any) {
        return handleUserError(e)
    }
}