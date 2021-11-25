import { ApolloServer, gql } from 'apollo-server';

//Teacher
import { typeDefs as teacherTypeDefs } from './graphql/TeacherTypeDefs';
import models  from '../models';
import db  from '../models';
// const server = new ApolloServer({
//     typeDefs:[userTypeDefs, applicationTypeDefs, credentialSourceTypeDefs], 
//     resolvers:[userResolvers, applicationResolvers, resourceResolvers, roleResolvers, credentialsSourceResolvers],
//     context: (req: any) => ({ models, req }),
// });

const server = new ApolloServer({
    typeDefs:[teacherTypeDefs],
    context: (req: any) => ({ models, req }),
})

//migration mode
//db.sequelize.sync({ match: /_dev$/}).then(() => {
db.sequelize.sync({ match: /institutedb$/, force: true }).then(() => {
server.listen().then(({ url }: {url:String}) => {
    console.log(`Server listening at ${url}`);
})
})

//normal mode
// server.listen().then(({ url }: {url:String}) => {
//     console.log(`Server listening at ${url}`);
// })