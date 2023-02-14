const { messageFromPartner } = require('./messageFromPartner');
const { threadReplyMessage } = require('./threadReplyMessage');
const eventController = require('../event');
const middleware = require('../../middleware');

module.exports = {
    messageRouter: ({ event, say, logger, body, client }) => {
        // logger.info(event.type, event.text);
        // logger.info("event", event)
        // logger.info("body", body)

        if (event.thread_ts) { // If has thread_ts, it's a reply
            threadReplyMessage({ event, say, logger, body, client });
        } else if (!event.thread_ts && event.channel_type === 'im') { // If it's a direct message
            eventController.appMention({ event, say, logger, body });
        } else {
            // logger.info(body);
        }
    },
    messageFromPartner
};