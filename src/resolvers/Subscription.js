// returns an AsyncIterator subscribed to the event of NEW_LINK
function newLinkSubscribe(parent, args, context, info) {
  return context.pubsub.asyncIterator("NEW_LINK")
}

const newLink = {
  subscribe: newLinkSubscribe,    // subscribe field must return an AsyncIterator
  resolve: payload => {           // resolve field returns data emitted from AsyncIterator
    return payload
  }
}

module.exports = {
  newLink
}
