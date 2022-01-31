import { userType} from '../../types/userType'
import { handleUserError, handleUserOk } from './handleUserResponse'
import { tenantContext } from '../credentials/tenantContext'
import { UserError } from './userError'
import { EmptyUser } from '../../types/userType'
import bcrypt from 'bcrypt'
import log from 'loglevel'
log.setLevel(process.env.LOG_LEVEL ? process.env.LOG_LEVEL as log.LogLevelDesc: "ERROR")

export const handleUserOwnChangePassword = async(_: any, args: any, { models, req}: {models: any, req: any}) => {
    try {
        const { userInstituteId, sessionUser  } = await tenantContext(req,'USER_OWN_CHANGE_PASSWORD')
        console.log(args)
        const userToUpdate = await models.User.findOne({
            where : {
                email : sessionUser && sessionUser.email , //the user change his own password
                InstituteId : userInstituteId //tenant security check
            }
        })
        if (!userToUpdate) throw new UserError("No se encontró el usuario", EmptyUser)
        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
        const hashedPassword : string = await bcrypt.hash(args.Password, salt);

        userToUpdate.password = hashedPassword
        userToUpdate.mustChangePassword = false
        await userToUpdate.save()
        return handleUserOk('Password propio modificado', userToUpdate)

    } catch (e : any) {
        return handleUserError(e)
    }
}