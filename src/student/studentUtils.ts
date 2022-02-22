import { userInfo } from "os";
import { studentType } from "../../types/studentType";
import models from '../../models'
import { Op } from "sequelize";
import { REPL_MODE_SLOPPY } from "repl";
import { StudentError } from "./studentError";

export const studentExists = async (student: studentType) => {
    let where: any = {}
    where.InstituteId = { [Op.eq]: student.InstituteId }
    where.documentNumber = { [Op.eq]: student.documentNumber }
    if (student.id) where.id = { [Op.not]: student.id } //id= null > insert | id!= null > update

    const studentFound = await models.Student.findOne({
        where: where
    })
    if (studentFound) throw new StudentError("Ya existe el estudiante", { ...student, id: 0 })
}