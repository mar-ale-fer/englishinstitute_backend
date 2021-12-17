import { handleLevelError, handleLevelOk } from './handleLevelResponse'
import { tenantContext } from '../credentials/tenantContext'
import { LevelError } from '../../errors/levelError';
import log from 'loglevel'
log.setLevel(process.env.LOG_LEVEL ? process.env.LOG_LEVEL as log.LogLevelDesc: "ERROR")

export const handleLevelById = async(_: any, args: any, { models, req}: {models: any, req: any}) => {
    try {
        const { userInstituteId  } = await tenantContext(req)
        const level = await models.Level.findOne({
            where : {
                id : args.id,
                InstituteId : userInstituteId //tenant security check
            }
        })
        if (!level) throw new LevelError('No se encontró el nivel', { id: args.id, name: '', InstituteId : userInstituteId})
        return handleLevelOk('Nivel', level)
    } catch (e : any) {
        return handleLevelError(e)
    }
}