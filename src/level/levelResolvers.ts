import log from 'loglevel'
import { levelType} from '../../types/levelType'
import { handleLevelCreate} from './levelCreate'

const levelOk = (message: string, level : levelType) =>  ({
    success : true,
    message,
    level
})

export const resolvers = {
    Mutation: {
        levelCreate: handleLevelCreate
    }
}