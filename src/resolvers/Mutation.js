const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

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

module.exports = {
    signUp,
    login,
    post
}
