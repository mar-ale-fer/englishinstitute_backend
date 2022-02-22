export type studentType = {
      id: number | null
      firstName: string
      lastName: string
      documentNumber: string
      dateOfBirth: Date
      phoneNumber: string
      email: string
      observations: string
      auditLastUser: string
      InstituteId: number
}

export const EmptyStudent: studentType = {
      id: 0,
      firstName: "",
      lastName: "",
      documentNumber: "",
      dateOfBirth: new Date(0),
      phoneNumber: "",
      email: "",
      observations: "",
      auditLastUser: "",
      InstituteId: 0
}