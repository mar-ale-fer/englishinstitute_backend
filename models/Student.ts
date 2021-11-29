'use strict';
import {Model} from 'sequelize';

interface StudentAttributes {
  id: number;
  firstName: string;
  lastName: string;
  documentNumber: string;
  dateOfBirth: Date;
  phoneNumber: string;
  email: string;
  college: string;
  shift: string;
  observations: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  
  class Student extends Model<StudentAttributes>
  implements StudentAttributes {
    id!: number;
    firstName!: string;
    lastName!: string;
    documentNumber!: string;
    dateOfBirth!: Date;
    phoneNumber!: string;
    email!: string;
    college!: string;
    shift!: string;
    observations!: string;
    static associate(models: any) {
      Student.belongsToMany(models.Class,{
        through: 'Enrollment'
      })
    }
  };
  Student.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName:{
      type: DataTypes.STRING,
      allowNull: false,
    },    
    lastName:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    documentNumber:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth:{
      type: DataTypes.DATE,
      allowNull: false,
    },
    phoneNumber:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    college:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    shift:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    observations:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};