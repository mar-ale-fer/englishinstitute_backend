'use strict';
import { Model } from 'sequelize';

interface EnrollmentAttributes {
  StudentId: number;
  CourseId: number;
  auditLastUser: string;  
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Enrollment extends Model<EnrollmentAttributes>
   implements EnrollmentAttributes {
    StudentId!:number;
    CourseId!:number;
    auditLastUser!: string;    
    static associate(models: any) {
      // define association here
    }
  };
  Enrollment.init({
    StudentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Students', 
        key: 'id'
      },
    },
    CourseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Courses',
        key: 'id'
      }
    },
    auditLastUser:{
      type: DataTypes.STRING,
      allowNull: false,
    },       
  }, {
    sequelize,
    modelName: 'Enrollment',
  });
  return Enrollment;
};