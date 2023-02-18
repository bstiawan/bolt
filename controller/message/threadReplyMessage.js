const openai = require('../../api/openai');

module.exports = {
    threadReplyMessage: async ({ event, say, logger, body, client }) => {
        const bot_user_id = body.auth.bot_user_id;

        // Get the message from the thread
        const replies = await client.conversations.replies({
            channel: event.channel,
            ts: event.thread_ts,
        });

        const conversations = replies.messages.map((reply) => {
            return `${reply.text}`;
        });
        // logger.info("threadReplyMessage", conversations[0]);

        // TODO: Check if the first message mentions the bot
        if (conversations[0].includes(`<@${bot_user_id}>`)) {
            logger.info("threadReplyMessage", event.type, event.text);

            // Request completion from openai
            const response = await openai.completion(conversations.join('\n\n'), body);

            // logger.info("threadReplyMessage", response);
            try {
                await say(response);
            }
            catch (error) {
                console.error(error);
            };
        }
    },
}