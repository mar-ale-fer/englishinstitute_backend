import { userType} from '../../types/userType'
import { userExists } from './userUtils'
import { handleUserError, handleUserOk } from './handleUserResponse'
import { tenantContext } from '../credentials/tenantContext'
import log from 'loglevel'
import bcrypt from 'bcrypt'

log.setLevel(process.env.LOG_LEVEL ? process.env.LOG_LEVEL as log.LogLevelDesc: "ERROR")
export const handleUserCreate = async(_: any, args: any, { models, req}: {models: any, req: any}) => {
    try {
        const { userInstituteId  } = await tenantContext(req, 'LEVEL_CREATE')

        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
        const hashedPassword : string = await bcrypt.hash(args.password, salt);

        const newUser : userType = {
            id: null,
            firstName : args.firstName,
            lastName: args.lastName,
            email: (args.email  as string).toLowerCase(),
            mustChangePassword: true,
            password: hashedPassword,
            backend: false, //this is true only in create-super-user
            roles: {roles:[]},
            InstituteId : userInstituteId
          }
        await userExists(newUser)
        const insertedUser = await models.User.create(newUser)
        return handleUserOk('Nivel creado', insertedUser)
    } catch (e : any) {
        return handleUserError(e)
    }
}