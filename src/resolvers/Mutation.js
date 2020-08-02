const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

// signup resolver
async function signUp(parent, args, context, info) {
    // encrypt password input from user
    const password = await bcrypt.hash(args.password, 10)

    // store user record in database using Prisma Client
    const user = await context.prisma.user.create({ data: {...args, password} })

    // generate JSON web token, signed with APP_SECRET
    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    // return the AuthPayload
    return {
        token,
        user
    }
}

// login resolver
async function login(parent, args, context, info) {
    // find user from database using Prisma Client based on email
    // specified in where condition
    const user = await context.prisma.user.findOne({
        where: { email: args.email }
    })
    if (!user) {
        throw new Error('No such user found')
    }

    // compare passwords between user input and database entry
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error('Invalid password')
    }

    // generate JSON web token, signed by APP_SECRET
    const token = jwt.sign({ userID: user.id }, APP_SECRET)

    // return the AuthPayload
    return {
        token,
        user
    }
}

// post resolver
function post(parent, args, context, info) {
    // retrieve userId that is authenticating
    const userId = getUserId(context)

    // create new entry in DB
    const newLink = context.prisma.link.create({
        data: {
            url: args.url,
            description: args.description,
            postedBy: { connect: { id: userId } }
        }
    })

    // publish subscription
    context.pubsub.publish("NEW_LINK", newLink)

    return newLink
}

// vote resolver
async function vote(parent, args, context, info) {
  // get JWT of user trying to vote
  const userId = getUserId(context)

  // find vote based on linkId and userId
  const vote = await context.prisma.vote.findOne({
    where: {
      linkId_userId: {
        linkId: Number(args.linkId),
        userId = userId
      }
    }
  })

  // if vote already exists, throw error
  if(Boolean(vote)) {
    throw new Error(`Already voted for link: ${args.linkId}`)
  }

  // if vote does not exist, create new vote
  const newVote = context.prisma.vote.create({
    data: {
      user: { connect: {id: userId} },
      link: { connect: {id: Number(args.linkId)} }
    }
  })

  // publish newly created vote
  context.pubsub.publish("NEW_VOTE", newVote)
  return newVote
}

module.exports = {
    signUp,
    login,
    post,
    vote
}
