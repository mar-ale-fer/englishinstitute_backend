import { levelExists } from '../level/levelUtils'
import { handleLevelError, handleLevelOk } from './handleLevelResponse'
import { tenantContext } from '../credentials/tenantContext'
import { LevelError } from './levelError';
import { levelType } from '../../types/levelType';

import log from 'loglevel'
log.setLevel(process.env.LOG_LEVEL ? process.env.LOG_LEVEL as log.LogLevelDesc: "ERROR")

export const handleLevelUpdate = async(_: any, args: any, { models, req}: {models: any, req: any}) => {
    try {
        const { userInstituteId  } = await tenantContext(req, 'LEVEL_UPDATE')
        const newLevel: levelType = {
            id : args.id,
            name : args.name,
            InstituteId : userInstituteId
        }
        await levelExists(newLevel) //exists level with the same name
        const levelToUpdate = await models.Level.findOne({
            where : {
                id : newLevel.id,
                InstituteId : userInstituteId //tenant security check
            }
        })
        if (!levelToUpdate) throw new LevelError('No se encontró el nivel', newLevel)
        levelToUpdate.name = newLevel.name
        await levelToUpdate.save()
        return handleLevelOk('Nivel modificado', levelToUpdate)
    } catch (e : any) {
        return handleLevelError(e)
    }
}

