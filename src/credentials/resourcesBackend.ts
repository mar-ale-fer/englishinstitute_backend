
type levelResource = 'LEVELS' | 'LEVEL_BY_ID' | 'LEVEL_CREATE' | 'LEVEL_UPDATE' |
    'LEVEL_DELETE';

type userResource = 'USERS' | 'USER_BY_ID' | 'USER_CREATE' | 'USER_UPDATE' |
    'USER_DELETE' | 'USER_CHANGE_PASSWORD';

type userOwnResource = 'USER_OWN_CHANGE_PASSWORD' | 'LOGGED_USER';

type studentResource = 'STUDENTS' | 'STUDENT_BY_ID' | 'STUDENT_CREATE' | 'STUDENT_UPDATE' |
    'STUDENT_DELETE';

type courseResource = 'COURSES' | 'COURSE_BY_ID' | 'COURSE_CREATE' | 'COURSE_UPDATE' |
    'COURSE_DELETE' | 'COURSE_ADD_STUDENT' | 'COURSE_REMOVE_STUDENT';

export type resource = levelResource
    | userResource
    | userOwnResource
    | studentResource
    | courseResource;

export const levelCRUDResources: levelResource[] = ['LEVEL_CREATE', 'LEVEL_UPDATE', 'LEVEL_DELETE'];
export const levelAllResources: levelResource[] = [...levelCRUDResources, 'LEVELS', 'LEVEL_BY_ID'];

export const userCRUDResources: userResource[] = ['USER_CREATE', 'USER_UPDATE', 'USER_DELETE', 'USER_CHANGE_PASSWORD'];
export const userOwnResources: userOwnResource[] = ['USER_OWN_CHANGE_PASSWORD', 'LOGGED_USER'];
export const userAllResources: userResource[] = [...userCRUDResources, 'USERS', 'USER_BY_ID'];

export const studentCRUDResources: studentResource[] = ['STUDENT_CREATE', 'STUDENT_UPDATE', 'STUDENT_DELETE'];
export const studentAllResources: studentResource[] = [...studentCRUDResources, 'STUDENTS', 'STUDENT_BY_ID'];

export const courseCRUDResources: courseResource[] = ['COURSE_CREATE', 'COURSE_UPDATE', 'COURSE_DELETE',
    'COURSE_ADD_STUDENT', 'COURSE_REMOVE_STUDENT'];
export const courseAllResources: courseResource[] = [...courseCRUDResources, 'COURSES', 'COURSE_BY_ID'];