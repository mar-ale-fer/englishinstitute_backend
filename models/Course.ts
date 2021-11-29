'use strict';
import {Model} from 'sequelize';

interface CourseAttributes {
  id: number;
  year: number;
  schedule: string;
  details: string;
  monthlyPrice: number;
}

module.exports = (sequelize: any, DataTypes: any) => {

  class Course extends Model<CourseAttributes>
  implements CourseAttributes {
    id!: number;
    year!: number;
    schedule!: string;
    details!: string;
    monthlyPrice!: number;
    static associate(models: any) {
      Course.belongsTo(models.Level,{
        foreignKey: { allowNull: false },
        onDelete:"RESTRICT",
        onUpdate:"RESTRICT",
      })
      Course.belongsTo(models.Teacher,{
        foreignKey: { allowNull: false },
        onDelete:"RESTRICT",
        onUpdate:"RESTRICT",
      })
      Course.belongsToMany(models.Student,{
          through: 'Enrollment'
        })
    }
  };
  Course.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    year:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    schedule:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    details:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    monthlyPrice:{
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    }      
  }, {
    sequelize, 
    modelName: 'Class',
  });
  return Course;
};