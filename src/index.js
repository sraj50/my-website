const { GraphQLServer } = require("graphql-yoga")

// const typeDefs = `
//  type Query {
//    info: String!
//    feed: [Link!]!
//   }

//   type Mutation {
//     post(url: String!, description: String!): Link!
//   }

//   type Link {
//    id: ID!
//    description: String!
//    url: String!
//   }
// `

// dummy data
let links = [{
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
}, ];

let idCount = links.length;

// implement GraphQL schema with resolvers
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            links.push(link)
            return link
        }
    },
    // Link: {
    //   id: (parent) => parent.id,
    //   description: (parent) => parent.description,
    //   url: (parent) => parent.url,
    // },
};

// GraphQL server
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    // typeDefs,
    resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));