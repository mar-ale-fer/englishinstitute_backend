import log from 'loglevel'
import { LevelError} from '../../errors/levelError'
import { levelType} from '../../types/levelType'
export const handleLevelError = (e : Error ) => {
    log.error(e)
    //const message = e.name === 'SequelizeUniqueConstraintError'? 'Ya existe el nivel que intentas crear' : e.message

    if (e instanceof LevelError) {
        return {
            success : false,
            message: `${e.message}`,
            level : e.level
        }
    }
    return  {
        success : false,
        message : `${e.message}`,
        level: {
            id : 0,
            name : ''
}}}

export const handleLevelOk = (message: string, level : levelType) =>  ({
    success : true,
    message,
    level
})