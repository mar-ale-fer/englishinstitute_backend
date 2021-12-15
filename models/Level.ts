'use strict';
import {Model} from 'sequelize';

interface LevelAttributes {
  id: number;
  name: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  
  class Level extends Model<LevelAttributes>
  implements LevelAttributes {
    id!: number;
    name!: string;
    static associate(models: any) {
      Level.hasMany(models.Course,{
        foreignKey: { allowNull: false },
        onDelete:"RESTRICT",
        onUpdate:"RESTRICT",
      })
      Level.belongsTo(models.Institute,{
        foreignKey: { allowNull: false },
        onDelete:"RESTRICT",
        onUpdate:"RESTRICT",
      })      
    }
  };
  Level.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
    }

  }, {
    sequelize, 
    modelName: 'Level',
    indexes: [
      {
        unique: true,
        fields: ['InstituteId','name']
      }
    ]
  });
  return Level;
};