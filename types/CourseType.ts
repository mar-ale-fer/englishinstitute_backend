export type CourseType = {
    id: number | null
    year: number
    schedule: string
    details: string
    monthlyPrice: number
    active: boolean
    LevelId: number
    auditLastUser: string
    InstituteId: number
}

export const EmptyCourse: CourseType = {
    id: 0,
    year: 0,
    schedule: '',
    details: '',
    monthlyPrice: 0,
    active: false,
    LevelId: 0,
    auditLastUser: '',
    InstituteId: 0,
}