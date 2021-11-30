'use strict';
import {Model} from 'sequelize';

interface UserAttributes {
  id: number;
  code: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  backend: boolean; //is a platform's IT backender?
  roles: string; //{"roles" : "['STUDENT','TEACHER','ADMINISTRATOR','SYSADMIN]"}
}

module.exports = (sequelize: any, DataTypes: any) => {
  
  class User extends Model<UserAttributes>
  implements UserAttributes {
    id!: number;
    code!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;
    backend!: boolean;
    roles!: string;
    static associate(models: any) {
      User.belongsTo(models.Institute,{
        foreignKey: { allowNull: false },
        onDelete:"RESTRICT",
        onUpdate:"RESTRICT",
      })
    }
  };
  User.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    code:{
      type: DataTypes.STRING,
      allowNull: false,
    },       
    firstName:{
      type: DataTypes.STRING,
      allowNull: false,
    },    
    lastName:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
    },  
    backend:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },    
    roles:{
      type: DataTypes.JSON,
      allowNull: false,      
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};