import { handleUserCreate} from './userCreate'
import { handleUserUpdate } from './userUpdate'
import { handleUserDelete } from './userDelete'
import { handleUsers } from './usersQuery'
import { handleUserById } from './userByIdQuery'
import { handleUserChangePassword } from './userChangePassword'
import { handleUserOwnChangePassword } from './userOwnChangePassword'
export const resolvers = {
    Query: {
        users: handleUsers,
        userById: handleUserById
    },
    Mutation: {
        userCreate: handleUserCreate,
        userUpdate: handleUserUpdate,
        userDelete: handleUserDelete,
        userChangePassword: handleUserChangePassword,
        userOwnChangePassword: handleUserOwnChangePassword
    }
}