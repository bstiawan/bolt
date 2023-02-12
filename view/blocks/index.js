const { replyMessageBlocks } = require('./replyMessageBlocks');
const { messageIgnored } = require('./messageIgnored');
const { sectionBlock } = require('./sectionBlock');

const blocks = {
    replyMessageBlocks,
    messageIgnored,
    sectionBlock
}

module.exports = blocks;