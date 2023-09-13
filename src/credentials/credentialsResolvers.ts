require('dotenv').config();
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { EmptyUser } from '../../types/userType';
const jwt_secret  = process.env.JWT_SECRET;
const jwt_expires_in_seconds = process.env.JWT_EXPIRES_IN_SECONDS ? parseInt(process.env.JWT_EXPIRES_IN_SECONDS) : 0;

export const resolvers =  {
  Mutation: {
    credentialsCreateToken: async ( _: any , args: any, { models }: {models:any}) => {
      console.log(args);

      if (jwt_secret == undefined) {
        console.log('faltan parámetros')
        return {
          success: false,
          message: 'Faltan parámetros de configuración para crear el token', 
          user: EmptyUser,
          token: ''
        }         
      }
      console.log('001');
      if (jwt_expires_in_seconds <=0 ){
        console.log('configuracion incorrecta')

        return {
          success: false,
          message: 'Configuración incorrecta que impide definir la duración del token', 
          user: EmptyUser,
          token: ''
        }           
      }
      console.log('002');

      //compare hashed password with stored password
      const user = await models.User.findOne({
        where: { 
          email: (args.user as string).toLowerCase(), //the email is ever stored in lowercase
        } 
      });
      console.log('003');

      if (!user) return {
        success: false,
        user: EmptyUser,
        message: 'No existe el usuario', 
        token: ''        
      }
      console.log('004');

      const comparisonResult = await bcrypt.compare(args.password, user.password);
      if (!comparisonResult) {
        console.log('password incorrecto')
        return {
          success: false,
          message: 'Password incorrecto', 
          user:EmptyUser,
          token: ''
        } 
      }
      console.log('005');

      //Store user info in the token
      const tokenInfo = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.LastName,
        roles: user.roles,
        backend: user.backend
      }
      console.log('006');

      const token= jwt.sign(tokenInfo, jwt_secret, { expiresIn: jwt_expires_in_seconds });
      console.log(token);
      const theUser2 = jwt.verify(token, jwt_secret);
      console.log(theUser2);

      console.log('usuario autenticado')
      return {
        success: true,
        message: 'Usuario autenticado', 
        user: user,
        token: token
      }         
    
    },    
  }
};


