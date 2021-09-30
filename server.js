require("dotenv").config();
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import schema, { typeDefs, resolvers } from "./schema";
import { getUser, protectResolver } from "./users/users.utils";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        return {
            loggedInUser: await getUser(req.headers.authorization),
            protectResolver,
        };
    },
});

const PORT = process.env.PORT;

server
    .listen(PORT)
    .then(() =>
        console.log(`🏋️‍♀️ Sever is running on http://localhost:${PORT}/ `)
    );
