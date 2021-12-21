
type levelResource = 'LEVELS' | 'LEVEL_BY_ID' | 'LEVEL_CREATE' | 'LEVEL_UPDATE' | 'LEVEL_DELETE'
type userResource = 'USERS' | 'USER_BY_ID' | 'USER_CREATE' | 'USER_UPDATE' | 'USER_DELETE'
export type resource = levelResource | userResource

export const levelCRUDResources: levelResource[] = ['LEVEL_CREATE', 'LEVEL_UPDATE', 'LEVEL_DELETE']
export const levelAllResources: levelResource[] = [...levelCRUDResources, 'LEVELS', 'LEVEL_BY_ID']
export const userCRUDResources : userResource[] = ['USER_CREATE', 'USER_UPDATE','USER_DELETE']
export const userAllResources: userResource[] = [...userCRUDResources, 'USERS', 'USER_BY_ID']

