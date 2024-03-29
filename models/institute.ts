'use strict';
import {Model} from 'sequelize';
interface InstituteAttributes {
  id: number;
  name: string;
  active: boolean;
}

module.exports = (sequelize: any, DataTypes: any) => {
  
  class Institute extends Model<InstituteAttributes>
  implements InstituteAttributes {
    id!: number;
    name!: string;
    active!: boolean;
    static associate(models: any) {
      Institute.hasMany(models.User,{
        foreignKey: { allowNull: false },
        onDelete:"RESTRICT",
        onUpdate:"RESTRICT",
      })
      Institute.hasMany(models.Level,{
        foreignKey: { allowNull: false },
        onDelete:"RESTRICT",
        onUpdate:"RESTRICT",
      })
      Institute.hasMany(models.Course,{
        foreignKey: { allowNull: false },
        onDelete:"RESTRICT",
        onUpdate:"RESTRICT",
      })
      Institute.hasMany(models.Attendance,{
        foreignKey: { allowNull: false },
        onDelete:"RESTRICT",
        onUpdate:"RESTRICT",
      })
      Institute.hasMany(models.Student,{
        foreignKey: { allowNull: false },
        onDelete:"RESTRICT",
        onUpdate:"RESTRICT",
      })
    }
  };
  Institute.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    active:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  }, {
    sequelize, 
    modelName: 'Institute',
  });
  return Institute;
};