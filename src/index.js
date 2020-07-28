const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");

// resolvers
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')

const prisma = new PrismaClient();

// implement GraphQL schema with resolvers
const resolvers = {
    Query,
    Mutation,
    User,
    Link
}

// GraphQL server
const server = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers,
    context: request => {   // context is a function that returns the HTTP request (array of objects) from GraphQL Query/Mutation
        return {            // and the PrismaClient object also
            ...request,
            prisma
        }
    }
});
server.start(() => console.log(`Server is running on http://localhost:4000`));

function searchArr(arr, id) {
    for (var i = 0; i < arr.length; i++) {
        const obj = arr[i];
        if (obj.id === id) {
            return obj;
        }
    }
}
