import { CourseType } from "../../types/courseType";
import { handleCourseError, handleCourseOk } from "./handleCourseResponse";
import { EmptyCourse } from "../../types/courseType";
import { tenantContext } from "../credentials/tenantContext";
import log from 'loglevel';
import { CourseError } from "./CourseError";

export const handleRemoveStudentFromCourse = async (_: any, args: any, { models, req }: { models: any, req: any }) => {
    try {

        const { userInstituteId, sessionUser } = await tenantContext(req, 'COURSE_REMOVE_STUDENT')

        console.log(args)
        //Check if the rol is valid 
        const courseId = args.courseId
        const studentId = args.studentId
        if (!courseId) throw new CourseError("Debe indicar un curso", EmptyCourse);
        if (!studentId) throw new CourseError("Debe indicar un estudiante", EmptyCourse);

        const studentToAdd = await models.Student.findByPk(args.studentId);
        if (!studentToAdd) throw new CourseError("No se encontró el estudiante que intenta desenrolar del curso", EmptyCourse);
        if (studentToAdd.InstituteId !== userInstituteId) throw new CourseError("No tiene autorización sobre el estudiante que intenta incorporar al curso", EmptyCourse) //tenant security filter

        const courseToUpdate = await models.Course.findByPk(courseId);
        if (!courseToUpdate) throw new CourseError("No se encontró el curso", EmptyCourse);
        if (courseToUpdate.InstituteId !== userInstituteId) throw new CourseError("No está autorizado a modificar este curso", EmptyCourse) //tenant security filter
        //If exist remove the enrollment
        const enrollmentToDelete = await models.Enrollment.findOne({
            where: {
                CourseId: courseId,
                StudentId: studentId
            }
        })
        if (!enrollmentToDelete) throw new CourseError("No existe el enrolamiento que intenta eliminar", EmptyCourse);

        await enrollmentToDelete.destroy();
        return handleCourseOk('Curso modificado. se eliminó el enrolamiento', courseToUpdate);

    } catch (e: any) {
        return handleCourseError(e);
    }
}