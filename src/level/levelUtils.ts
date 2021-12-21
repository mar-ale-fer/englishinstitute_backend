import models  from '../../models';
import { LevelError } from './levelError';
import { levelType } from '../../types/levelType';

export const levelExists = async (level : levelType) => {
    const levelFound = await models.Level.findOne({
        where : {
            name : level.name,
            InstituteId: level.InstituteId  //tenant security check
        }
    })
    if (levelFound) throw new LevelError('Ya existe el nivel', {...level, id : 0})
}
