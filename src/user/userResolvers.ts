import { handleUserCreate} from './userCreate'
// import { handleUserUpdate } from './userUpdate'
// import { handleUserDelete } from './userDelete'
// import { handleUsers } from './usersQuery'
// import { handleUserById } from './userByIdQuery'
//todo: permit CRUD only for INSTITUTE rol
export const resolvers = {
    // Query: {
    //     levels: handleUsers,
    //     levelById: handleUserById
    // },
    Mutation: {
        levelCreate: handleUserCreate,
        // levelUpdate: handleUserUpdate,
        // levelDelete: handleUserDelete
    }
}