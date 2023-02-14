const openai = require('../../api/openai');

module.exports = {
    appMention: async ({ event, say, logger, body }) => {
        logger.info("appMention", event.type, event.text);
        // logger.info(body)

        const response = await openai.completion(event.text, body);

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