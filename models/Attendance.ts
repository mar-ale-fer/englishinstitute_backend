'use strict';
import {Model} from 'sequelize';

interface AttendanceAttributes {
  id: number;
  day: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {

  class Attendance extends Model<AttendanceAttributes>
  implements AttendanceAttributes {
    id!: number;
    day!: Date;
    static associate(models: any) {
      Attendance.belongsTo(models.Student,{
        foreignKey: { allowNull: false },
        onDelete:"RESTRICT",
        onUpdate:"RESTRICT",
      })
      Attendance.belongsTo(models.Class,{
        foreignKey: { allowNull: false },
        onDelete:"RESTRICT",
        onUpdate:"RESTRICT",
      })
    }
  };
  Attendance.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    day:{
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    sequelize, 
    modelName: 'Attendance',
  });
  return Attendance;
};