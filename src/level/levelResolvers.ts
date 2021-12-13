import { getJWTTokenFromRequest, getUserFromToken } from "../credentials/sessionTokenBackend"
import { userSessionType } from "../../types/userSessionType"
import log from 'loglevel'
import { getUserInstituteId } from "../user/userUtils"

log.setLevel(process.env.LOG_LEVEL ? process.env.LOG_LEVEL as log.LogLevelDesc: "ERROR")
const levelError = (e : Error) => {
    log.error(e)
    return  {
        success : false,
        message : `${e.name}: ${e.message}`,
        level: {
            id : 0,
            name : ''
}}}

export const resolvers = {
    Mutation: {
        levelCreate: async(_: any, args: any, { models, req}: {models: any, req: any}) => {
            try {
                const sessionUser : userSessionType = getUserFromToken(getJWTTokenFromRequest(req))
                log.info(sessionUser)  
                if (!sessionUser) throw new Error('No hay información sobre el usuario en la sesión');  
                const userInstituteId = getUserInstituteId(sessionUser.email)
                log.info(await userInstituteId)                
            } catch (e : any) {
                return levelError(e)
            }

            return {
                success : true,
                message: 'ok',
                level: {
                    id:0,
                    name: 'un nivel'
                }
            }
        }
    }
}