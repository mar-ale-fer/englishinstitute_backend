'use strict';
import { Model } from 'sequelize';

interface EnrollmentAttributes {
  StudentId: number;
  CourseId: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Enrollment extends Model<EnrollmentAttributes>
   implements EnrollmentAttributes {
    StudentId!:number;
    CourseId!:number;
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
    }
  }, {
    sequelize,
    modelName: 'Enrollment',
  });
  return Enrollment;
};