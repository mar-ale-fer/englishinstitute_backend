import { ApolloServer, gql } from 'apollo-server';

import { typeDefs as teacherTypeDefs } from './teacher/teacherTypeDefs';
import { typeDefs as credentialsTypeDefs } from './credentials/credentialsTypeDefs';
import { resolvers as credentialsResolvers } from './credentials/credentialsResolvers';
import { typeDefs as instituteTypeDefs } from './institute/InstituteTypeDefs';
import { resolvers as instituteResolvers } from './institute/InstituteResolvers';
import { typeDefs as levelTypeDefs } from './level/LevelTypeDefs';
import { resolvers as levelResolvers } from './level/levelResolvers';
import { typeDefs as userTypeDefs } from './user/UserTypeDefs';
import { resolvers as userResolvers } from './user/userResolvers';

import models  from '../models';
import db  from '../models';

const server = new ApolloServer({
    typeDefs:[teacherTypeDefs, instituteTypeDefs, credentialsTypeDefs, levelTypeDefs, userTypeDefs],
    resolvers:[instituteResolvers, credentialsResolvers, levelResolvers, userResolvers],
    context: (req: any) => ({ models, req }),
})

// // //migration mode
// //db.sequelize.sync({ match: /_dev$/}).then(() => {
// db.sequelize.sync({ match: /institutedb$/, force: true }).then(() => {
// server.listen().then(({ url }: {url:String}) => {
//     console.log(`Server listening at ${url}`);
// })
// })


// //normal mode
server.listen().then(({ url }: {url:String}) => {
    console.log(`Server listening at ${url}`);
})