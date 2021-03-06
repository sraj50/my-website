// resolver for postedBy field in Link
// first fetch the link from database using prisma then call postedBy on result from DB
// hence parent.id is used which is returned from previous resolver and points to link id
function postedBy(parent, args, context, info) {
    return context.prisma.link.findOne({ where: { id: parent.id } }).postedBy()
}

// resolver for link-votes relation
function votes(parent, args, context) {
  return context.prisma.link.findOne({ where: { id: parent.id } }).votes()
}

module.exports = {
    postedBy,
    votes
}
