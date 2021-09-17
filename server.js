import { ApolloServer, gql } from "apollo-server";

import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const typeDefs = gql`
    type Movie {
        title: String
        year: Int
    }
    type Query {
        movies: [Movie]
        movie: Movie
    }
`;

const resolvers = {
    Query: {
        movies: () => [],
        movie: () => ({ title: "Hello", year: 2021 }),
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server
    .listen()
    .then(() => console.log("Sever is running on http://localhost:4000/ "));
