require('dotenv').config();
import jwt from 'jsonwebtoken';
const jwt_secret  = process.env.JWT_SECRET;

export const decodedToken = (req: { req: { headers: { authorization: any; }; }; }) => {
  const header =  req.req.headers.authorization;
    
  if ( header && jwt_secret !== undefined){
    const token = header.replace('Bearer ', '');
    const decoded = jwt.verify(token, jwt_secret);
    return decoded;
  }

  throw new Error('Debe tener una sesión iniciada para acceder al recurso');

}