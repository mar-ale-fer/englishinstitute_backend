require('dotenv').config();
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
const jwt_secret  = process.env.JWT_SECRET;
const jwt_expires_in_seconds = process.env.JWT_EXPIRES_IN_SECONDS ? parseInt(process.env.JWT_EXPIRES_IN_SECONDS) : 0;

export const resolvers =  {
  Mutation: {
    credentialsCreateToken: async ( _: any , args: any, { models }: {models:any}) => {
      console.log(args);

      if (jwt_secret == undefined) {
        return {
          success: false,
          message: 'Faltan parámetros de configuración para crear el token', 
          token: ''
        }         
      }

      if (jwt_expires_in_seconds <=0 ){
        return {
          success: false,
          message: 'Configuración incorrecta que impide definir la duración del token', 
          token: ''
        }           
      }

      //compare hashed password with stored password
      const user = await models.User.findOne({
        where: { 
          email: args.user,
        } 
      });

      if (!user) return {
        success: false,
        message: 'No existe el usuario', 
        token: ''        
      }
      const comparisonResult = await bcrypt.compare(args.password, user.password);
      if (!comparisonResult) {
        return {
          success: false,
          message: 'Password incorrecto', 
          token: ''
        } 
      }

      //Store user info in the token
      const tokenInfo = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.LastName,
        roles: user.roles,
        backend: user.backend
      }
      const token= jwt.sign(tokenInfo, jwt_secret, { expiresIn: jwt_expires_in_seconds });
      console.log(token);
      const theUser2 = jwt.verify(token, jwt_secret);
      console.log(theUser2);

      return {
        success: true,
        message: 'Usuario autenticado', 
        token: token
      }         
    
    },    
  }
};


