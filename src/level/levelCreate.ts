import { levelType} from '../../types/levelType'
import { levelExists } from '../level/levelUtils'
import { userSessionType } from "../../types/userSessionType"
import { getJWTTokenFromRequest, getUserFromToken } from "../credentials/sessionTokenBackend"
import { getUserInstituteId } from "../user/userUtils"
import { handleLevelError, handleLevelOk } from './handleLevelResponse'
import log from 'loglevel'
log.setLevel(process.env.LOG_LEVEL ? process.env.LOG_LEVEL as log.LogLevelDesc: "ERROR")

export const handleLevelCreate = async(_: any, args: any, { models, req}: {models: any, req: any}) => {
    try {
        const sessionUser : userSessionType = getUserFromToken(getJWTTokenFromRequest(req))
        log.info(sessionUser)  
        if (!sessionUser) throw new Error('No hay información sobre el usuario en la sesión');  
        const userInstituteId = await getUserInstituteId(sessionUser.email)
        log.info(await userInstituteId)  
        const newLevel: levelType = {
            id : null,
            name : args.name,
            InstituteId : userInstituteId
        }
        await levelExists(newLevel)
        const insertedLevel = await models.Level.create(newLevel)
        return handleLevelOk('Nivel creado', insertedLevel)
    } catch (e : any) {
        return handleLevelError(e)
    }
}