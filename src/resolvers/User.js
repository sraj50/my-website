// resolver for links field in User
// first retrieve user from DB, then call links again
// parent.id will point to id returned from previous resolver which is the id of the user

function links(parent, args, context) {
    return context.prisma.user.findOne({ where: { id: parent.id } }).links()
}

module.exports = {
    links
}