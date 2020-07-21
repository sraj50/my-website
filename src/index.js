const { GraphQLServer } = require("graphql-yoga")

// dummy data
let links = [{
	id: "link-0",
	url: "www.howtographql.com",
	description: "Fullstack tutorial for GraphQL",
}]

let idCount = links.length;

// implement GraphQL schema with resolvers
const resolvers = {
	Query: {
		info: () => `This is the API of a Hackernews Clone`,
		feed: () => links,
		link: (parent, args) => {
			return (searchArr(links, args.id))
		}
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
		},
		updateLink: (parent, args) => {
			for (var i = 0; i < links.length; i++) {
				if (links[i].id === args.id) {
					links[i].url = args.url
					links[i].description = args.description
					return links[i]
					break
				}
			}
		},
		deleteLink: (parent, args) => {
			var index = links.findIndex(link => {
				return link.id === args.id
			})
			// console.log(index)
			var deletedLink = links.splice(index, 1) // array of deleted element(s) returned
			return deletedLink[0]
		}
	},
};

// GraphQL server
const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	// typeDefs,
	resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));

function searchArr(arr, id) {
	for (var i = 0; i < arr.length; i++) {
		const obj = arr[i]
		if(obj.id === id) {
			return obj
		}
	}
}