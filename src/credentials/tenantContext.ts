import { userSessionType } from "../../types/userSessionType";
import { getJWTTokenFromRequest, getUserFromToken } from "../credentials/sessionTokenBackend"
import { getUserInstituteId } from "../user/userUtils"
import { resource } from "./resourcesBackend";
import { resourceIsAuthorized } from "./resourceIsAuthorized";


export const tenantContext = async (req : any, resource : resource) : 
    Promise<{ sessionUser: userSessionType; userInstituteId: number; }> => {
    const sessionUser : userSessionType = getUserFromToken(getJWTTokenFromRequest(req))
    if (!sessionUser) throw new Error('No hay información sobre el usuario en la sesión');  
    if (!resourceIsAuthorized) throw new Error(`El rol del usuario no le permite acceder al recurso "${resource}"`)
    const userInstituteId = await getUserInstituteId(sessionUser.email)
    return {
        sessionUser,
        userInstituteId
    }
}
