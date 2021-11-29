'use strict';
import {Model} from 'sequelize';

interface ClassAttributes {
  id: number;
  year: number;
  schedule: string;
  classRoom: string
}

module.exports = (sequelize: any, DataTypes: any) => {

  class Class extends Model<ClassAttributes>
  implements ClassAttributes {
    id!: number;
    year!: number;
    schedule!: string;
    classRoom!: string;
    static associate(models: any) {
      Class.belongsTo(models.Level,{
        foreignKey: { allowNull: false },
        onDelete:"RESTRICT",
        onUpdate:"RESTRICT",
      })
      Class.belongsTo(models.Teacher,{
        foreignKey: { allowNull: false },
        onDelete:"RESTRICT",
        onUpdate:"RESTRICT",
      })
      Class.belongsToMany(models.Student,{
          through: 'Enrollment'
        })
    }
  };
  Class.init({
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
    classRoom:{
      type: DataTypes.STRING,
      allowNull: false,
    }    
  }, {
    sequelize, 
    modelName: 'Class',
  });
  return Class;
};