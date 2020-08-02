// resolver for vote-link relation
function link(parent, args, context) {
  return context.prisma.vote.findOne({ where: { id: parent.id } }).link()
}

// resolver for vote-user relation
function user(parent, args, context) {
  return context.prisma.vote.findOne({ where: { id: parent.id } }).user()
}

module.exports = {
  link,
  user
}
