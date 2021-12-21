import log from 'loglevel';
import models  from '../../models';
import { userType } from '../../types/userType';
import { UserError } from './userError';

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

export const userExists = async (user : userType) => {
    const userFound = await models.User.findOne({
        where : {
            email : user.email, //The user is unique for all the application tenants
        }
    })
    if (userFound) throw new UserError('Ya existe el usuario', {...user, id : 0})
}
