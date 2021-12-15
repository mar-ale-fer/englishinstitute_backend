import { levelType} from '../../types/levelType'
import { levelExists } from '../level/levelUtils'
import { handleLevelError, handleLevelOk } from './handleLevelResponse'
import { tenantContext } from '../credentials/tenantContext'
import log from 'loglevel'
log.setLevel(process.env.LOG_LEVEL ? process.env.LOG_LEVEL as log.LogLevelDesc: "ERROR")

export const handleLevelCreate = async(_: any, args: any, { models, req}: {models: any, req: any}) => {
    try {
        const { userInstituteId  } = await tenantContext(req)
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