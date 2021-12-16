import { levelExists } from '../level/levelUtils'
import { handleLevelError, handleLevelOk } from './handleLevelResponse'
import { tenantContext } from '../credentials/tenantContext'
import { LevelError } from '../../errors/levelError';
import { levelType } from '../../types/levelType';

import log from 'loglevel'
log.setLevel(process.env.LOG_LEVEL ? process.env.LOG_LEVEL as log.LogLevelDesc: "ERROR")

export const handleLevelDelete = async(_: any, args: any, { models, req}: {models: any, req: any}) => {
    try {
        const { userInstituteId  } = await tenantContext(req)
        const levelToDelete = await models.Level.findOne({
            where : {
                id : args.id,
                InstituteId : userInstituteId //tenant security check
            }
        })
        if (!levelToDelete) throw new LevelError('No se encontró el nivel', { id: args.id, name: '', InstituteId : userInstituteId})
        await levelToDelete.destroy()
        return handleLevelOk('Nivel eliminado', levelToDelete)
    } catch (e : any) {
        return handleLevelError(e)
    }
}

