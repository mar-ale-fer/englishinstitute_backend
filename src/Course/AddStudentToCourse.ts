import { CourseType } from "../../types/courseType";
import { handleCourseError, handleCourseOk } from "./handleCourseResponse";
import { EmptyCourse } from "../../types/courseType";
import { tenantContext } from "../credentials/tenantContext";
import log from 'loglevel';
import { CourseError } from "./CourseError";

export const handleAddStudentToCourse = async (_: any, args: any, { models, req }: { models: any, req: any }) => {
    try {

        const { userInstituteId, sessionUser } = await tenantContext(req, 'COURSE_ADD_STUDENT')

        console.log(args)
        //Check if the rol is valid 
        const courseId = args.courseId
        const studentId = args.studentId
        if (!courseId) throw new CourseError("Debe indicar un curso", EmptyCourse);
        if (!studentId) throw new CourseError("Debe indicar un estudiante", EmptyCourse);

        const studentToAdd = await models.Student.findByPk(args.studentId);
        if (!studentToAdd) throw new CourseError("No se encontró el estudiante que intenta incorporar", EmptyCourse);
        if (studentToAdd.InstituteId !== userInstituteId) throw new CourseError("No tiene autorización sobre el estudiante que intenta incorporar al curso", EmptyCourse) //tenant security filter

        const courseToUpdate = await models.Course.findByPk(courseId);
        if (!courseToUpdate) throw new CourseError("No se encontró el curso", EmptyCourse);
        if (courseToUpdate.InstituteId !== userInstituteId) throw new CourseError("No está autorizado a modificar este curso", EmptyCourse) //tenant security filter
        //Add course to the users if not asigned already
        const aEnrollment = await models.Enrollment.findOne({
            where: {
                CourseId: courseId,
                StudentId: studentId
            }
        })
        if (!aEnrollment) {
            const newEnrollment = {
                CourseId: courseId,
                StudentId: studentId,
                auditLastUser: sessionUser?.email || ''
            }
            await models.Enrollment.create(newEnrollment);
            return handleCourseOk('Curso modificado. Se incluyó el enrolamiento', courseToUpdate);

        }
        return handleCourseOk('El estudiante ya está enrolado, no se hicieron modificaciones al curso', courseToUpdate);

    } catch (e: any) {
        return handleCourseError(e);
    }
}