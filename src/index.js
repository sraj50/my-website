const { GraphQLServer } = require('graphql-yoga')

// define GraphQL schema
const typeDefs = `
type Query {
  info: String!
}
`

// implement GraphQL schema with resolvers
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`
  }
}

// GraphQL server
const server = new GraphQLServer({
  typeDefs,
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))