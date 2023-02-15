const openai = require('../../api/openai');
const message = require('../../view/message');

module.exports = {
    threadReplyMessage: async ({ event, say, logger, body, client }) => {
        logger.info("threadReplyMessage", event.type, event.text);

        // Get the message from the thread
        const replies = await client.conversations.replies({
            channel: event.channel,
            ts: event.thread_ts,
        });

        const conversations = replies.messages.map((reply) => {
            return `${reply.text}`;
        });

        // Request completion from openai
        const response = await openai.completion(conversations.join('\n\n'), body);

        // logger.info("threadReplyMessage", response);
        try {
            await say(response);
        }
        catch (error) {
            console.error(error);
        };
    },
}