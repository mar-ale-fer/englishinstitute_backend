import log from 'loglevel';
import models  from '../../models';

export const getUserInstituteId = async ( email : string) : Promise<number> => {
    try {
        const user = await models.User.findOne({
            where : {
                email
            }
        });
        if (!user) throw new Error('No existe el usuario');  
        return user.InstituteId 
    } catch (e) {
        log.error(e)
        throw new Error('Error al consultar datos del usuario');  
    }
}

