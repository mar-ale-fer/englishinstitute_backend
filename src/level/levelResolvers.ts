import { handleLevelCreate} from './levelCreate'
import { handleLevelUpdate } from './levelUpdate'
import { handleLevelDelete } from './levelDelete'
import { handleLevels } from './levelsQuery'
import { handleLevelById } from './levelByIdQuery'
//todo: permit CUD only for INSTITUTE rol
export const resolvers = {
    Query: {
        levels: handleLevels,
        levelById: handleLevelById
    },
    Mutation: {
        levelCreate: handleLevelCreate,
        levelUpdate: handleLevelUpdate,
        levelDelete: handleLevelDelete
    }
}