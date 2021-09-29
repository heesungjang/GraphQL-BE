require("dotenv").config();
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import schema from "./schema";

const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: {
        Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjMyOTMwMjUwfQ.dSCFSwTYNbJ-Yd0INHbX-yNM4zq_l5ZPjTUMUTwXcK0",
    },
});

const PORT = process.env.PORT;

server
    .listen(PORT)
    .then(() =>
        console.log(`🏋️‍♀️ Sever is running on http://localhost:${PORT}/ `)
    );
