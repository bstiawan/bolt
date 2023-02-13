const openai = require('../../api/openai');

module.exports = {
    appMention: async ({ event, say, logger, body }) => {
        logger.info(event.type, event.text);
        logger.info(body)

        const response = await openai.completion(event.text, event.user);

        try {
            await say({
                thread_ts: event.ts,
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
    }
}