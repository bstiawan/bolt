const { replyMessageBlocks } = require('./replyMessageBlocks');
const { messageIgnored } = require('./messageIgnored');
const { loading } = require('./loading');
const { errorBlocks } = require('./errorBlocks');

const blocks = {
    replyMessageBlocks,
    messageIgnored,
    loading,
    errorBlocks
}

module.exports = blocks;