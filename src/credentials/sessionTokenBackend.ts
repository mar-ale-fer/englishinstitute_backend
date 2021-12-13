require('dotenv').config();
import jwt from 'jwt-decode'
import { userSessionType } from '../../types/userSessionType';
export const getJWTTokenFromRequest = (req: { req: { headers: { authorization: any; }; }; }) => {
  const header =  req.req.headers.authorization;
  if ( header ){
    const token = header.replace('Bearer ', '');
    return token;
  }

  throw new Error('Debe tener una sesión iniciada para acceder al recurso');  
}

export const getUserFromToken = (jwtToken : string) : userSessionType => {
  if (!jwtToken || jwtToken === '') throw new Error('No hay información del token de sesión');  

  let user : userSessionType = null
  try {
    user  = jwt(jwtToken);
  } catch (e : any) {
    throw new Error('El token es inválido. Vuelva a iniciar la sesión');  
  } 

  if (user) return user    
  return null   
}
