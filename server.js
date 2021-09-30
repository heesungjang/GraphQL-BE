require("dotenv").config();
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import schema from "./schema";
import { getUser } from "./users/users.utils";

const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: async ({ req }) => {
        return {
            loggedInUser: await getUser(req.headers.authorization),
        };
    },
});

const PORT = process.env.PORT;

server
    .listen(PORT)
    .then(() =>
        console.log(`🏋️‍♀️ Sever is running on http://localhost:${PORT}/ `)
    );
