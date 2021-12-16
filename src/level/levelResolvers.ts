import { levelType} from '../../types/levelType'
import { handleLevelCreate} from './levelCreate'
import { handleLevelUpdate } from './levelUpdate'
import { handleLevelDelete } from './levelDelete'
const levelOk = (message: string, level : levelType) =>  ({
    success : true,
    message,
    level
})

export const resolvers = {
    Mutation: {
        levelCreate: handleLevelCreate,
        levelUpdate: handleLevelUpdate,
        levelDelete: handleLevelDelete
    }
}