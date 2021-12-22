import { userType} from '../../types/userType'
import { userExists } from './userUtils'
import { handleUserError, handleUserOk } from './handleUserResponse'
import { tenantContext } from '../credentials/tenantContext'
import log from 'loglevel'
import bcrypt from 'bcrypt'
import { UserError } from './userError'

log.setLevel(process.env.LOG_LEVEL ? process.env.LOG_LEVEL as log.LogLevelDesc: "ERROR")
export const handleUserUpdate = async(_: any, args: any, { models, req}: {models: any, req: any}) => {
    try {
        const { userInstituteId  } = await tenantContext(req, 'USER_UPDATE')

        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
        const hashedPassword : string = await bcrypt.hash(args.password, salt);

        const newUser : userType = {
            id: args.id,
            firstName : args.firstName,
            lastName: args.lastName,
            email: (args.email  as string).toLowerCase(),
            mustChangePassword: true,
            password: hashedPassword,
            backend: false, //this is true only in create-super-user
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
        return handleUserOk('Usuario modificado', userToUpdate)
    } catch (e : any) {
        return handleUserError(e)
    }
}