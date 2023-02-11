const { conversationReply } = require('./conversationReply');
const { messageIgnored } = require('./messageIgnored');
const { loading } = require('./loading');

const blocks = {
    conversationReply,
    messageIgnored,
    loading
}

module.exports = blocks;