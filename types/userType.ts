export type userType = {
    id: number,
    code: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    backend: boolean, //is a platform's IT backender?
    roles: string //{"roles" : "['STUDENT','TEACHER','ADMINISTRATOR','SYSADMIN]"}
  }