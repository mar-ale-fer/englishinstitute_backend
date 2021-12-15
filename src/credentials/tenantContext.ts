import { userSessionType } from "../../types/userSessionType";
import { getJWTTokenFromRequest, getUserFromToken } from "../credentials/sessionTokenBackend"
import { getUserInstituteId } from "../user/userUtils"


export const tenantContext = async (req : any) : Promise<{ sessionUser: userSessionType; userInstituteId: number; }> => {
    const sessionUser : userSessionType = getUserFromToken(getJWTTokenFromRequest(req))
    if (!sessionUser) throw new Error('No hay información sobre el usuario en la sesión');  
    const userInstituteId = await getUserInstituteId(sessionUser.email)
    return {
        sessionUser,
        userInstituteId
    }
}
