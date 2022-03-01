'use strict';
import { Model } from 'sequelize';

interface TeacherAttributes {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  auditLastUser: string;
}

module.exports = (sequelize: any, DataTypes: any) => {

  class Teacher extends Model<TeacherAttributes>
    implements TeacherAttributes {
    id!: number;
    firstName!: string;
    lastName!: string;
    phoneNumber!: string;
    auditLastUser!: string;
    static associate(models: any) {
      // Teacher.hasMany(models.Course,{
      //   foreignKey: { allowNull: false },
      //   onDelete:"RESTRICT",
      //   onUpdate:"RESTRICT",
      // })
      Teacher.belongsTo(models.Institute, {
        foreignKey: { allowNull: false },
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
      })
    }
  };
  Teacher.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    auditLastUser: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Teacher',
  });
  return Teacher;
};