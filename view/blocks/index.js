const { replyMessageBlocks } = require('./replyMessageBlocks');
const { messageIgnored } = require('./messageIgnored');
const { sectionBlock } = require('./sectionBlock');
const { applyCreditBlocks } = require('./applyCreditBlocks');
const { inactiveMessageBlocks } = require('./inactiveMessageBlocks');
const { noCreditMessageBlocks } = require('./noCreditMessageBlocks');

module.exports = {
    replyMessageBlocks,
    messageIgnored,
    sectionBlock,
    applyCreditBlocks,
    inactiveMessageBlocks,
    noCreditMessageBlocks
};