'use strict';
import { Model } from 'sequelize';

interface EnrollmentAttributes {
  StudentId: number;
  ClassId: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Enrollment extends Model<EnrollmentAttributes>
   implements EnrollmentAttributes {
    StudentId!:number;
    ClassId!:number;
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
    ClassId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Classes',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Enrollment',
  });
  return Enrollment;
};