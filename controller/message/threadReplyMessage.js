const openai = require('../../api/openai');

module.exports = {
    threadReplyMessage: async ({ event, say, logger, body, client }) => {
        logger.info(body);

        // Get the message from the thread
        const message = await client.conversations.replies({
            channel: event.channel,
            ts: event.thread_ts,
        });

        const context = message.messages.map((message) => {
            return message.text;
        });

        // Request completion from openai
        const response = await openai.completion(context.join('\n\n'), event.user);

        logger.info("threadReplyMessage", "reply thread");
        try {
            await say({
                thread_ts: event.thread_ts,
                text: response,
                "blocks": [
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": response
                        }
                    }
                ]
            });
        }
        catch (error) {
            console.error(error);
        };
    },
}