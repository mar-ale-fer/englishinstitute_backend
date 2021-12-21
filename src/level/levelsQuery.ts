import { handleLevelError } from './handleLevelResponse'
import { tenantContext } from '../credentials/tenantContext'
import { levelType } from '../../types/levelType';
import { Op } from 'sequelize';
import log from 'loglevel'
log.setLevel(process.env.LOG_LEVEL ? process.env.LOG_LEVEL as log.LogLevelDesc: "ERROR")

export const handleLevels = async(_: any, args: any, { models, req}: {models: any, req: any}) => {
    //filters from the user
    let where: any = {}
    if (args.name && args.name !=="") {where.name = {[Op.iLike]: args.name+'%'}}
    try {
        const { userInstituteId  } = await tenantContext(req, 'LEVELS')
        where.InstituteId = userInstituteId //tenant security filter

        const levels : levelType[] = models.Level.findAll({
            limit: 100,
            where:where,
            order: [
              ['name','asc']
            ]
        });
        
        return {
            success: true,
            message: 'Listado de niveles',
            levels
        }
    } catch (e : any) {
        return handleLevelError(e)
    }
}

