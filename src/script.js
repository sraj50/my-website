// import PrismaClient
const { PrismaClient } = require('@prisma/client');

// instantiate PrismaClient
const prisma = new PrismaClient()

// send query to database
async function main() {
	const newLink = await prisma.link.create({
		data: {
			description: 'Fullstack tutorial for GraphQl',
			url: 'www.howtographql.com'
		}
	})
	const allLinks = await prisma.link.findMany()
	console.log(allLinks)
}

main()
	.catch(e => {
		throw e
	})
	.finally(async () => {
		await prisma.disconnect()
	})