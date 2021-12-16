import { handleLevelCreate} from './levelCreate'
import { handleLevelUpdate } from './levelUpdate'
import { handleLevelDelete } from './levelDelete'
import { handleLevels } from './levelsQuery'
//todo: permit CUD only for INSTITUTE rol
export const resolvers = {
    Query: {
        levels: handleLevels
    },
    Mutation: {
        levelCreate: handleLevelCreate,
        levelUpdate: handleLevelUpdate,
        levelDelete: handleLevelDelete
    }
}