import { instituteType } from "../../types/instituteType";
import { userType } from "../../types/userType";
import { rolesType} from "../../types/roleType";
import bcrypt from 'bcrypt'

export const resolvers =  {
  Mutation: {
    createInstituteWithUser: async ( _: any , args: any, { models, req }: {models:any, req: any}) => {
      const newInstitute : instituteType = {
        id: null,
        name: args.name,
        active: true
      } 
      
      try {
        //check if an Institute with the same name already exists
        const InstituteFound = await models.Institute.findOne({ 
          where: { 
          name: newInstitute.name,
          } 
        })  
        if (InstituteFound) {
          return {
            success: false,
            message: `Ya existe un instituto con el nombre ${newInstitute.name}.`, 
            institute: {
              id: 0,
              name: newInstitute.name,
              active: false
            } 
          }   
        }
        //check if an user with the same email already exists
        const userFound = await models.User.findOne({ 
          where: { 
          email: args.email,
          } 
        })  
        if (userFound) {
          return {
            success: false,
            message: `Ya existe un usuario con el email ${args.email}.`, 
            institute: {
              id: 0,
              name: newInstitute.name,
              active: false
            } 
          }   
        }

        const insertedInstitute = await models.Institute.create(newInstitute)
        console.log(insertedInstitute.dataValues)

        //create first user of the institute. With hashed password
        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
        const hashedPassword : string = await bcrypt.hash(args.password, salt);

        const instituteRole : rolesType = {
          roles : [ 'INSTITUTE','ADMINISTRATOR','SECRETARY']
        }
        const newUser : userType = {
          id: null,
          firstName : args.firstName,
          lastName: args.lastName,
          email: args.email,
          mustChangePassword: true,
          password: hashedPassword,
          backend: false, //this is true only in create-super-user
          roles: instituteRole,
          InstituteId : insertedInstitute.dataValues.id
        }

        const insertedUser = await models.User.create(newUser)
        console.log(insertedUser.dataValues)

        return {
          success: true,
          message: 'Instituto creado', 
          institute: {
            ...newInstitute,
            id: insertedInstitute.dataValues.id
          }
        }        

      } catch (error : any) {
        console.error(error)
        const errormessage= ( error && error.errors && error.errors[0] && error.errors[0].type ) ? 
          `Tipo: ${error.errors[0].type}. Mensaje: ${error.errors[0].message}` :
          `Código: ${error.parent.code}. Mensaje: ${error.parent.detail}`

        return {
          success: false,
          message: `Error al crear el instituto. ${errormessage}.`, 
          institute: {
            id: 0,
            name: newInstitute.name,
            active: false
          } 
        }                
      }
    }
  }
};

